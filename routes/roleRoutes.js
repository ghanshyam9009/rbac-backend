const express = require('express');
const { createRole, assignRole, revokeRole } = require('../controllers/roleController');
const { roleMiddleware } = require('../middlewares/rbacMiddleware');
const router = express.Router();

// Create role
router.post('/create', roleMiddleware(['Admin']), createRole);

// Assign role to user
router.post('/assign', roleMiddleware(['Admin']), assignRole);

// Revoke role from user
router.post('/revoke', roleMiddleware(['Admin']), revokeRole);

module.exports = router;
