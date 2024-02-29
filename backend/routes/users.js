const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Child = require("../models/Child");
const verifyToken = require("../middleware/verifyToken");

userRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// get all children from parent id
userRouter.get("/:parentId/children", async (req, res) => {
  try {
    const { parentId } = req.params;
    const parent = await User.findById(parentId).populate("children");
    if (!parent) {
      return res.status(404).json({ message: "parent not found" });
    }
    res.status(200).json(parent.children);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});


userRouter.post("/:parentId/add-child", async (req, res, next) => {
  try {
    const { parentId } = req.params;
    const { name, age, username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newChild = new Child({
      name,
      age,
      username,
      password: hashedPassword,
      email,
    });
    await newChild.save();

    const parent = await User.findByIdAndUpdate(
      parentId,
      {
        $push: { children: newChild._id },
      },
      { new: true }
    );

    await parent.save();

    res.status(201).json({ message: "Child added successfully", parent });
  } catch (error) {
    return next(new Error("profile not found"));
  }
});

userRouter.get("/profile/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  try {
    const profile = await User.findById(id);
    if (!profile) {
      return next(new Error("profile not found"));
    }
    res.status(200).json(profile);
  } catch (error) {
    next(new Error(error));
  }
});

// update user profile
userRouter.put("/profile/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) {
        return res.json("email taken");
      }
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashedSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(new Error("couldn't update user"));
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    return next(new Error("couldn't delete user"));
  }
});

// userRouter.get("/dashboard", async (req, res) => {});

module.exports = userRouter;
