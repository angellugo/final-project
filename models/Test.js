const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const TestSchema = new Schema({
  // `title` is required and of type String
  testData: {
    type: String,
  },
});

// This creates our model from the above schema, using mongoose's model method
const Test = mongoose.model('Test', TestSchema);

// Export the Article model
module.exports = Test;
