module.exports = (mongoose) => {
  const Schema = mongoose.Schema;
  const Encrypt = require("../../Encrypt");

  const userSchema = Schema({
    email: { type: String, unique: true },
    password: { type: String },
    tasks: [{ type: Schema.Types.ObjectId, ref: "tasks" }],
  });

  userSchema.pre("save", async function (next) {
    this.password = Encrypt.encrypt(this.password);
    return next();
  });

  userSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", userSchema);
  return User;
};
