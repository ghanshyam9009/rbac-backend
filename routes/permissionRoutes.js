const express = require('express');
const { assignPermission, revokePermission } = require('../controllers/permissionController');
const { roleMiddleware } = require('../middlewares/rbacMiddleware');
const router = express.Router();

// Assign permission
router.post('/assign', roleMiddleware(['Admin', 'Manager']), assignPermission);

// Revoke permission
router.post('/revoke', roleMiddleware(['Admin', 'Manager']), revokePermission);

module.exports = router;
