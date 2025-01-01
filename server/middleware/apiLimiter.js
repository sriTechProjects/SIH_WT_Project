const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: {
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
    success: false,
  },
});

module.exports = apiLimiter;
