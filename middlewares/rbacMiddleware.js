exports.roleMiddleware = (roles) => {
    return (req, res, next) => {
      const userRoles = req.user.roles;
  
      // Check if user has any of the roles
      if (!userRoles.some(role => roles.includes(role))) {
        return res.status(403).json({ message: "Access denied" });
      }
  
      next();
    };
  };
  