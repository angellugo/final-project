const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    default: ''
  },
   lastName: {
    type: String,
    default: ''
  },
   password: {
    type: String,
    default: ''
  },
   isDeleted: {
    type: Boolean,
    default: false
  },
   isAdmin: {
    type: Boolean,
    default: false
  },
   isManager: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateHash = function (password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};
userSchema.methods.validPassword = function( password){
return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
