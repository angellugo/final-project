const mongoose = require('mongoose');

const usersessionSchema = new mongoose.Schema({
  userID: {
    type: String,
    default: '',
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('usersession', usersessionSchema);
