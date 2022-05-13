const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller.js");

router.post("/addnew", taskController.createNewTask);
router.get("/alltasks", taskController.findAllTasks);
router.get("/:userId", taskController.findActiveTasksByUser);
router.get("/:userId/oldtasks", taskController.findOldTasksByUser);
router.get("/:user/:id", taskController.findOneTask);
router.put("/:user/:id", taskController.updateTask);
router.delete("/:user/:id", taskController.deleteTask);
router.delete("/:user", taskController.deleteAllTasks);

module.exports = router;
