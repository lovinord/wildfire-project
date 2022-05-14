const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");

const port = 3001;
const uri =
  "mongodb+srv://lovnord:Mongodblosen1@cluster0.a1kas.mongodb.net/wildfire?retryWrites=true&w=majority";

//Server Setup
const app = express();
app.use(express.json());

const userRoutes = require("./app/routes/user.routes");
const taskRoutes = require("./app/routes/task.routes");
const treeRoutes = require("./app/routes/tree.routes");

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(
  session({
    name: "Ballerina",
    secret: "Let's all go to the movies",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 8 * 60 * 60 * 1000 },
  })
);

//Mongo DB Atlas Setup
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoogogoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//Routes setup
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/tree", treeRoutes);

app.listen(process.env.PORT || 3001, function () {
  console.log("CORS-enabled web server is listening.");
});
