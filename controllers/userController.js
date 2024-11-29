const User = require('../models/User');

// Update user information (username, email, etc.)
exports.updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Users can only update their own details
    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Change the role of the user (Admin or Manager changing their role)
exports.changeRole = async (req, res) => {
  try {
    const { newRole } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Admin and Manager can change their own roles
    if (req.user.role !== 'Admin' && req.user.role !== 'Manager') {
      return res.status(403).json({ message: "You don't have permission to change your role" });
    }

    // Ensure the new role is valid
    const validRoles = ['Admin', 'Manager', 'User'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    user.role = newRole;  // Changing the role
    await user.save();

    res.status(200).json({ message: "Role changed successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error changing role", error: error.message });
  }
};

// Delete user account
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Users can delete their own accounts
    await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};
