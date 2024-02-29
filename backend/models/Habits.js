const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  child: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  exercise: String,
  waterIntake: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Habit", habitSchema);
