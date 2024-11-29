const User = require('../models/User');

// Assign permission to user
exports.assignPermission = async (req, res) => {
  try {
    const { userId, permission } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.permissions.push(permission);
    await user.save();

    res.status(200).json({ message: "Permission assigned successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error assigning permission", error: error.message });
  }
};

// Revoke permission from user
exports.revokePermission = async (req, res) => {
  try {
    const { userId, permission } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.permissions = user.permissions.filter(perm => perm !== permission);
    await user.save();

    res.status(200).json({ message: "Permission revoked successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error revoking permission", error: error.message });
  }
};
