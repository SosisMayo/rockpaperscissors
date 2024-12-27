const env = require("../../config/environment");
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  jwt.verify(token, env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
