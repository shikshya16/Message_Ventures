const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId , res) => {

    const token = jwt.sign({userId} , process.env.JWT_SECRET ,
      {
        expiresIn : '30d'
     });

     res.cookie("jwt" , token , {
        maxAge: 15 * 24 * 60 * 60 * 1000 ,
        httpOnly : true,     //prevent XSS attacks (i.e. cross-site scripting attacks)
        sameSite : "strict" ,
        secure : process.env.NODE_ENV !== "development"
     });
};

module.exports = generateTokenAndSetCookie ;