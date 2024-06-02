const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const connectToMongoDB = require('./db/db');
const { app, server } = require('../server/socket/socket');

const authRoutes = require('../server/routes/auth.routes');
const messageRoutes = require('../server/routes/message.routes');
const userRoutes = require('../server/routes/user.routes');

dotenv.config();

// const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, ".." , "/client/dist")));


app.get("*", (req, res) => {

	res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));

});

server.listen(PORT, () => {

	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
	
});