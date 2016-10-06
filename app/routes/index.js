const userAPI = require('./user.router');
const taskAPI = require('./task.router');

module.exports = function(app) {
  app.use('/user', userAPI);
  app.use('/task', taskAPI);
};
