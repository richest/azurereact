require("dotenv").config();
const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { ensureAuth } = require("../../middleware/ensure-auth");

const { User } = require("../../db/models");
const { createToken } = require("../../utils/helper");
const { signUp, validateLogin, updateUser } = require("./validate");

const app = express.Router();

app.post("/sign-up", async (req, res) => {
  let { name, email, password } = req.body;

  const { error } = signUp.validate(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });

  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return res.status(400).send({ msg: "Email Already Exists" });
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password,
  });

  const token = createToken(newUser.dataValues.userId, email);

  let data = {
    userId: newUser.dataValues.userId,
    name: newUser.dataValues.name,
    email: newUser.dataValues.email,
  };

  return res
    .status(201)
    .header("authorization", token)
    .json({ ...data });
});

app.post("/login", async (req, res, next) => {
  let { email, password } = req.body;

  const { error } = validateLogin.validate(req.body);
  if (error) {
    return res.status(400).send({ msg: error.details[0].message });
  }

  let user = await User.findOne({
    where: {
      email,
      password: { [Op.ne]: null },
    },
  });

  if (!user) {
    return res.status(404).send({ msg: "Email does not exist!" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(404).send({ msg: "Invalid Password!" });
  }

  const token = createToken(user.userId, user.email);

  return res.header("authorization", token).status(200).json({
    userId: user.userId,
    name: user.name,
    email: user.email,
  });
});

app.get("/:id", ensureAuth, async (req, res, next) => {
  const { id } = req.params;

  if (!id || id <= 0) {
    return res.status(404).send({ msg: "Invalid Id!" });
  }

  let user = await User.findOne({
    where: {
      userId: id,
    },
  });
  if (!user) {
    return res.status(404).send({ msg: "User does not exists!" });
  }

  let data = {
    userId: user.dataValues.userId,
    name: user.dataValues.name,
    email: user.dataValues.email,
    
  };

  return res.status(200).json({ ...data });
});

module.exports = app;
