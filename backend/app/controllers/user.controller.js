const db = require("../models");
const User = db.users;
const Encrypt = require("../../Encrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  let userExists = await User.exists({ email: req.body.email });
  if (userExists) {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user.password === Encrypt.encrypt(req.body.password)) {
      user.password = null;
      req.session.user = user;
      return res
        .status(200)
        .json({ success: "Login successful", loggedInUser: user });
    }
  }

  return res.status(401).json({ error: "Bad credentials" });
};

exports.createUser = async (req, res) => {
  let userExists = await User.exists({ email: req.body.email });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "An user with that email already exists" });
  }

  let user = await User.create(req.body);
  user.password = undefined;
  return res.json(user);
};

exports.findUserById = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

exports.whoami = (req, res) => {
  return res.json(req.session.user || null);
};

exports.logout = (req, res) => {
  if (req.session.user) {
    delete req.session.user;
    return res.json({ message: "Logout successfull" });
  } else {
    return res.json({ error: "Already logged out" });
  }
};
