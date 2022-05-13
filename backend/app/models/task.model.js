module.exports = (mongoose) => {
  const Schema = mongoose.Schema;

  const taskSchema = Schema(
    {
      taskName: {
        type: String,
      },
      status: {
        type: String,
        default: "active",
      },
      deadline: {
        type: Date,
        default: Date.now,
      },
      userId: { type: Schema.Types.ObjectId, ref: "user" },
    },
    {
      timestamps: true,
    }
  );

  const Task = mongoose.model("tasks", taskSchema);
  return Task;
};
