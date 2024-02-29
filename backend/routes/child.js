const express = require("express");
const childRouter = express.Router();
const Child = require("../models/Child");

// get children
childRouter.get("/", async (req, res) => {
  try {
    const child = await Child.find();
    res.json(child);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


childRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const children = await Child.find({ parentId: userId }); 
    res.json(children);
  } catch (error) {
    console.error("Error fetching child data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = childRouter;
