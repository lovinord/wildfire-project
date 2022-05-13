const express = require("express");
const router = express.Router();

const treeController = require("../controllers/tree.controller.js");

router.get("/:userId/trees", treeController.findDeadTreesByUser);
router.post("/killtree", treeController.createDeadTree);


module.exports = router;
