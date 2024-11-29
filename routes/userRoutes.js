const express = require('express');
const { updateUser, changeRole, deleteUser } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/rbacMiddleware'); // Ensures user has proper permissions
const router = express.Router();

// Update user information
router.put('/update', authMiddleware, updateUser);

// Change role (only for Admins and Managers)
router.put('/change-role', authMiddleware, roleMiddleware(['Admin', 'Manager']), changeRole);

// Delete own account (user can delete their own account)
router.delete('/delete', authMiddleware, deleteUser);

module.exports = router;
