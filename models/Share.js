const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema(
  {
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
    shareId: { type: String, unique: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Share", shareSchema);
