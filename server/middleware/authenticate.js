const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
};

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "No token provided, authorization denied",
      success: false,
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
  // console.log("decoded data :-: \n", decoded.email);

  req.user = decoded;
  next();
};

module.exports = authenticate;
