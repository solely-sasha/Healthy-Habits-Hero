const express = require("express");
const choreAssignmentsRouter = express.Router();
const ChoreAssignment = require("../models/ChoreAssignments");
const Child = require("../models/Child");
const Chore = require("../models/Chores");
const verifyToken = require("../middleware/verifyToken");

choreAssignmentsRouter.post("/assign-random", verifyToken, async (req, res) => {
  try {
    const parentId = req.user._id;

    const children = await Child.find({ parent: parentId });
    const chores = await Chore.find();


    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    for (const day of daysOfWeek) {
      for (const child of children) {
  
        const randomChore = chores[Math.floor(Math.random() * chores.length)];

        const newAssignment = new ChoreAssignment({
          childId: child._id,
          choreId: randomChore._id,
          dayOfWeek: day,
        });

        await newAssignment.save();
      }
    }

    res.status(201).json({ message: "Chores assigned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = choreAssignmentsRouter;

