const db = require("../models");
const Task = db.tasks;

exports.createNewTask = (req, res) => {
  if (!req.body.taskName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const task = new Task({
    taskName: req.body.taskName,
    status: req.body.status,
    deadline: req.body.deadline,
    userId: req.body.userId,
  });

  task
    .save(task)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the task.",
      });
    });
};

exports.findAllTasks = (req, res) => {
  const taskName = req.query.taskName;
  var condition = taskName
    ? { taskName: { $regex: new RegExp(taskName), $options: "i" } }
    : {};

  Task.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving task.",
      });
    });
};

exports.findOneTask = (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found task with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving task with id=" + id });
    });
};

exports.findActiveTasksByUser = async (req, res) => {
  try {
    let usertasks = await Task.find({
      userId: req.params.userId,
      status: "active",
    }).sort({ deadline: 1 });
    if (usertasks.length) {
      res.status(200).json(usertasks);
      return;
    }
    res.status(404).json({ error: "No tasks found" });
  } catch (err) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

exports.findOldTasksByUser = async (req, res) => {
  try {
    let usertasks = await Task.find({
      userId: req.params.userId,
      $or: [{ status: "completed" }, { status: "missed" }],
    }).sort();
    if (usertasks.length) {
      res.status(200).json(usertasks);
      return;
    }
    res.status(404).json({ error: "No tasks found" });
  } catch (err) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

exports.updateTask = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`,
        });
      } else res.send({ message: "Task was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Task with id=${id}.`,
        });
      } else {
        res.send({
          message: "Task was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};

exports.deleteAllTasks = (req, res) => {
  const userId = req.params.user;
  Task.deleteMany({ userId: userId })
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tasks were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tasks.",
      });
    });
};
