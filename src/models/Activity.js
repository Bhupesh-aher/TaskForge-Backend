const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  action: {
    type: String,   // e.g. "created", "updated", "deleted"
    required: true
  },
  targetType: {
    type: String,   // e.g. "card", "list", "board"
    required: true
  },
  targetName: {
    type: String,   // e.g. "Implement Auth"
    default: ""
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
