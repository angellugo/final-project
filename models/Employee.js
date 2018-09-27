const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const EmployeeSchema = new Schema({
  name: {
    type: String,
    allowNull: false,
  },
  email: {
    type: String,
    allowNull: false,
  },
  phone: {
    type: String,
    allowNull: false,
  },
  clockIn: [{type: Date}],
  clockOut: [{type: Date}],
});

// This creates our model from the above schema, using mongoose's model method
const Employee = mongoose.model('Employee', EmployeeSchema);

// Export the Article model
module.exports = Employee;
