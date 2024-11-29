const User = require('../models/User');
const Role = require('../models/Role');

// Create new role
exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const newRole = new Role({ name, permissions });
    await newRole.save();

    res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error: error.message });
  }
};

// Assign role to user
exports.assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findById(userId);
    const role = await Role.findById(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: "User or Role not found" });
    }

    user.roles.push(roleId);
    await user.save();

    res.status(200).json({ message: "Role assigned successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error assigning role", error: error.message });
  }
};

// Revoke role from user
exports.revokeRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.roles = user.roles.filter(role => role.toString() !== roleId);
    await user.save();

    res.status(200).json({ message: "Role revoked successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error revoking role", error: error.message });
  }
};
