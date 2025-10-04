const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board"
  },
  type: {
    type: String, // e.g. "board_invite", "card_assignment", "card_update"
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
