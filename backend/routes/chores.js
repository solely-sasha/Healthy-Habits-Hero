const express = require("express");
const choreRouter = express.Router();
const Chore = require("../models/Chores");

// create a chore
choreRouter.post("/", async (req, res) => {
  try {
    const newChore = new Chore(req.body);
    await newChore.save();
    res.status(201).json(newChore);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all chores
choreRouter.get("/", async (req, res) => {
  try {
    const foundChores = await Chore.find();
    res.status(200).json({ message: "All chores found!", chores: foundChores });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// get one chore
choreRouter.get("/:id", async (req, res) => {
  try {
    const chore = await Chore.findById(req.params.id);
    if (!chore) {
      return res.status(404).json({ message: "chore not found" });
    }
    res.json(chore);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// update a chore
choreRouter.put("/:id", async (req, res) => {
  try {
    const updatedChore = await Chore.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedChore) {
      return res.status(404).json({ message: "chore not found" });
    }
    res.json(updatedChore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete a chore
choreRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChore = await Chore.findByIdAndDelete(id);
    if (!deletedChore) {
      return res.status(404).json({ message: "chore not found" });
    }
    res.json({ message: "chore deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = choreRouter;
