const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Goal = mongoose.models.Goal || mongoose.model("Goal", goalSchema);

module.exports = Goal;
