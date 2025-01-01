const roleBasedAccess = require("../middleware/roleBasedAccess.js");
const multiRoleAccess = (roles) => (req, res, next) => {
  for (const role of roles) {
    const middleware = roleBasedAccess(role);
    middleware(req, res, (err) => {
      if (!err) {
        return next();
      }
    });
  }
  return res.status(403).json({
    message: "Access forbidden: insufficient permissions",
    success: false,
  });
};

module.exports = multiRoleAccess;
