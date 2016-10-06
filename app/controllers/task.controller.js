const taskService = require('../services/task.service');
const task = require('../models/taskSchema');

function index(req, res) {
  if (!req.session.data) {
    const message = [{ msg: 'Unautorized User' }];
    res.status(401).json(message);
  } else {
    taskService.findOne({ 'userId': req.session._id }, function(err, data) {
      if (err) {
        const message = 'Unable to pull out data';
        res.status(401).json(message);
      } else {
        res.status(200).json(data.todolist.reverse());
      }
    });
  }
}

function insert(req, res) {
  if (!req.session.data) {
    const message = 'Unautorized User';
    res.status(401).json(message);
  } else {
    if (req.body) {
      taskService.findAndAppend({ 'userId': req.session._id }, req.body, function(err, data) {
        if (err) {
          const message = 'Updating database failed';
          res.status(401).json(message);
        } else {
          res.status(200).json(data.todolist.reverse());
        }
      });
    }
  }
}

function remove(req, res) {
  if (!req.session.data) {
    const message = 'Unautorized User';
    res.status(401).json(message);
  } else {
    if (req.body.task) {
      taskService.findAndRemove({ 'userId': req.session._id }, req.body, function(err, data) {
        if (err) {
          const message = 'Updating database failed';
          res.status(401).json(message);
        } else {
          res.status(200).json(data.todolist.reverse());
        }
      });
    }
  }
}

function edit(req, res) {
  if (!req.session.data) {
    const message = 'Unautorized User';
    res.status(401).json(message);
  } else {
    if (req.body.task) {
      const editeddata = { task: req.body.task, taskTitle: req.body.taskTitle };
      const index = req.body.index;
      taskService.findOne({ 'userId': req.session._id }, function(err, data) {
        if (err) {
          const message = 'Try after sometime';
          res.status(401).json(message);
        } else {

          const todolist = data.todolist.reverse();
          todolist[req.body.index] = editeddata;
          const temp = todolist.reverse();
          taskService.findAndUpdate(data._id, temp,
            function(err, doc) {
              if (err) {
                const message = 'Updating database failed';
                res.status(401).json(message);
              } else {
                res.status(200).json(data.todolist.reverse());
              }
            });
        }
      });
    }
  }
}

function reorder(req, res) {
  if (!req.session.data) {
    const message = 'Unautorized User';
    res.status(401).json(message);
  } else {
    taskService.findOne({ 'userId': req.session._id }, function(err, data) {
      if (err) {
        const message = 'Try after sometime';
        res.status(401).json(message);
      } else {
        const updatedlist = req.body.reverse();
        taskService.findAndUpdate(data._id, updatedlist,
          function(err, data) {
            if (err) {
              const message = "Updating database failed";
              res.status(401).json(message);
            } else {
              res.status(200).json("sucess");
            }
          });
      }
    });

  }
}

module.exports = {
  index: index,
  insert: insert,
  edit: edit,
  reorder: reorder,
  remove: remove
};
