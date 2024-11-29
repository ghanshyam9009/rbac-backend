// models/Permission.js (Optional)

const mongoose = require('mongoose');

// Define the permission schema
const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['read', 'write', 'update', 'delete'],
  },
});

module.exports = mongoose.model('Permission', permissionSchema);
