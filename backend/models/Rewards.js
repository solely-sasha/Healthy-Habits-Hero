const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  child: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  rewardName: {
    type: String,
  },
  pointsNeeded: {
    type: Number,
  },
});

module.exports = mongoose.model("Rewards", rewardSchema);
