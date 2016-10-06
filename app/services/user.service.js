const User = require('../models/userSchema');

function findOne(query, cb) {
  return User.findOne(query).lean().exec(cb);
}

function save(userdata, cb) {
  const createUser = new User(userdata);
  return createUser.save(cb)
}

module.exports = {
  findOne: findOne,
  save: save,
}
