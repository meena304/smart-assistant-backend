const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    inputText: String,
    outputText: String,
    type: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Content", contentSchema);
