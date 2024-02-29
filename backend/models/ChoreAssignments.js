const mongoose = require("mongoose");

const choreAssignmentSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child",
  },
  choreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chore",
  },
  dayOfWeek: {
    type: String,
  },
});

module.exports = mongoose.model("ChoreAssignment", choreAssignmentSchema);
