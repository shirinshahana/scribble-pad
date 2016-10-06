const Task = require('../models/taskSchema');

function findOne(query, cb) {
  return Task.findOne(query).lean().exec(cb);
}

function findAndUpdate(id, update, cb) {
  return Task.update({'_id': id}, {'todolist': update}).lean().exec(cb);
}

function findAndAppend(id, append, cb) {
  return Task.findOneAndUpdate(id, { $push: { 'todolist': append } }, { safe: true, upsert: true, new: true }).lean().exec(cb)
}

function findAndRemove(id, remove, cb) {
  return Task.findOneAndUpdate(id, { $pull: { 'todolist': remove } }, { safe: true, upsert: true, new: true }).lean().exec(cb);
}

function save(userid,cb) {
  const newTask = new Task(userid);
  return newTask.save(cb)
}

//safe: true-To return the error if any in the callback
// upsert: true-To create a new object if does not exist
// new: true-To return the updated new document in the callback

module.exports = {
  findOne: findOne,
  findAndUpdate: findAndUpdate,
  findAndAppend: findAndAppend,
  findAndRemove: findAndRemove,
  save: save,
}
