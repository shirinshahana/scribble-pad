const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');
const timeStamps = require('mongoose-timestamp');
const registerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

registerSchema.plugin(uniqueValidator);
registerSchema.plugin(timeStamps);
module.exports = mongoose.model('User', registerSchema);
