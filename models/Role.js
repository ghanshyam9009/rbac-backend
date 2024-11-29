// models/Role.js

const mongoose = require('mongoose');

// Define the role schema
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Admin', 'Manager', 'User'],
  },
  permissions: [
    {
      type: String,
      enum: ['read', 'write', 'update', 'delete'],
    },
  ],
});

module.exports = mongoose.model('Role', roleSchema);
