const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const { username, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res
          .status(200)
          .send({ "message:": "Not able to genertae hash", error: err });
      } else {
        const user = new UserModel({
          username,
          email,
          pass: hash,
        });
        await user.save();
        res
          .status(200)
          .send({ message: "New user has been registered", newUser: user });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { username: user.username, userID: user._id },
            "masai",
            { expiresIn: "7d" }
          );
          res.status(200).send({ message: "Login Successful", token: token });
        } else {
          res.status(200).send({ message: "Wrong Credentials" });
        }
      });
    } else {
      res.status(200).send({ message: "User doesn't exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
});

userRouter.get("/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    blacklist.push(token);
    console.log(blacklist);
    res.status(200).send({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
});

module.exports = { userRouter };
