const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Card title is required"],
  },
  description: {
    type: String,
    default: ""
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
    required: true
  },
  position: {
    type: Number,
    default: 0
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  dueDate: {
    type: Date
  },
  attachments: [{
    url: String,
    fileName: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Card", cardSchema);
