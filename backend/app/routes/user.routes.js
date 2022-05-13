const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller.js");

router.post("/signup", userController.createUser);
router.get("/whoami", userController.whoami);
router.get("/:id", userController.findUserById);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;
