var mongoose = require('mongoose');
var Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');
var timeStamps = require('mongoose-timestamp');

var todolistSchema = new Schema({
  userId: {
    type: String
  },
  todolist: {
    type: Array
  }
});

todolistSchema.plugin(uniqueValidator);
todolistSchema.plugin(timeStamps);
module.exports = mongoose.model('todolist', todolistSchema);