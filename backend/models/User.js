const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Additional fields for user profile (e.g., address, orders history, etc.)
});

const User = mongoose.model('User', userSchema);

module.exports = User;
