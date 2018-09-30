const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const companySchema = new mongoose.Schema({
  
  companyName: {
    type: String,
    default: ''
  },
  companyAddress: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  adminFirstName: {
    type: String,
    default: ''
  },
  adminLastName: {
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
    default: true
  },
  isManager: {
  type: Boolean,
  default: false
  }
});

companySchema.methods.generateHash = function (password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};
companySchema.methods.validPassword = function( password){
return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('company', companySchema);
