const rolesConfig = require("../../config/roles");

const authorize = (requiredPermissions) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!rolesConfig.roles[userRole]) {
      return res.status(403).json({ message: "Access denied" });
    }

    const userPermissions = rolesConfig.roles[userRole];
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

module.exports = authorize;
