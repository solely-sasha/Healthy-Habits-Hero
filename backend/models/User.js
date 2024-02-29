const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }],
    role: {
      type: String,
      // enum: ["parent", "child"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
