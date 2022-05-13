const uri =
  "mongodb+srv://lovnord:Mongodblosen1@cluster0.a1kas.mongodb.net/wildfire?retryWrites=true&w=majority";

const dbConfig = uri;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig;
db.users = require("./user.model.js")(mongoose);
db.tasks = require("./task.model.js")(mongoose);
db.trees = require("./tree.model.js")(mongoose);

module.exports = db;
