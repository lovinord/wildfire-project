const db = require("../models");
const Tree = db.trees;

exports.findOneTree = (req, res) => {
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

exports.createDeadTree = (req, res) => {
  const tree = new Tree(
    {
      isDead: req.params.isDead,
      userId: req.body.userId,
      taskId: req.body.taskId,
      treeIndex: req.body.treeIndex,
    },
    { upsert: true, new: false }
  );

  tree
    .save(tree)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the tree.",
      });
    });
};

exports.findDeadTreesByUser = async (req, res) => {
  try {
    let trees = await Tree.find({
      userId: req.params.userId,
    });
    if (trees.length) {
      res.status(200).json(trees);
      return;
    }
    res.status(404).json({ error: "No dead trees found" });
  } catch (err) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
