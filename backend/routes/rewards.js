const express = require("express");
const rewardRouter = express.Router();
const Rewards = require("../models/Rewards");

// Get all rewards
rewardRouter.get("/", async (req, res) => {
  try {
    const rewards = await Rewards.find();
    res.json(rewards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a specific reward by ID
rewardRouter.get("/:id", async (req, res) => {
  try {
    const reward = await Rewards.findById(req.params.id);
    if (!reward) {
      return res.status(404).json({ message: "reward not found" });
    }
    res.json(reward);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new reward
rewardRouter.post("/", async (req, res) => {
  try {
    const newReward = new Rewards(req.body);
    await newReward.save();
    res.status(201).json(newReward);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a reward
rewardRouter.put("/:id", async (req, res) => {
  try {
    const updatedReward = await Rewards.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReward) {
      return res.status(404).json({ message: "reward not found" });
    }
    res.json(updatedReward);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a reward
rewardRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReward = await Rewards.findByIdAndDelete(id);
    if (!deletedReward) {
      return res.status(404).json({ message: "reward not found" });
    }
    res.json({ message: "reward deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = rewardRouter;
