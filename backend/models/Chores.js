const mongoose = require("mongoose");

const choreSchema = new mongoose.Schema({
  child: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  choreName: String,
  completed: { type: Boolean, default: false },
  points: {
    type:String
  }

});

module.exports = mongoose.model("Chore", choreSchema);
