module.exports = (mongoose) => {
  const Schema = mongoose.Schema;

  const treeSchema = Schema({
    isDead: {
      type: Boolean,
      default: true,
    },
    treeIndex: {
      type: Number,
    },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    taskId: { type: Schema.Types.ObjectId, ref: "tasks" },
  });

  const Tree = mongoose.model("trees", treeSchema);
  return Tree;
};
