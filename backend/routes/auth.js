const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Child = require("../models/Child");

// signup

// Parent Signup Route
authRouter.post("/signup/parent", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "parent",
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Child Signup Route
authRouter.post("/signup/child", async (req, res) => {
  try {
    const { username, email, password, parentEmail } = req.body;

    const parent = await User.findOne({ email: parentEmail });

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newChild = new Child({
      username,
      email,
      password: hashedPassword,
    });

    const savedChild = await newChild.save();

    parent.children.push(savedChild._id);
    await parent.save();

    res.status(200).json({ message: "Child signed up successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// signin
authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;

    if (role === "child") {
      user = await Child.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(404).json("User not found!");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { password: _, ...info } = user._doc;

    res.cookie("token", token).status(200).json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// signout
authRouter.get("/signout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("user successfully signed out");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = authRouter;
