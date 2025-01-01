const roleBasedAccess = (allowedRoles) => (req, res, next) => {
  console.log("User details:", req.user);
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      message: "Access forbidden: insufficient permissions",
      success: false,
    });
  }
  next();
};

module.exports = roleBasedAccess;
