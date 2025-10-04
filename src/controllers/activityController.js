const Activity = require("../models/Activity");

// Add new activity
exports.logActivity = async ({ board, user, action, targetType, targetName, message, io }) => {
  try {
    const activity = await Activity.create({ board, user, action, targetType, targetName, message });
    if (io) io.to(board.toString()).emit("activityCreated", activity);
    return activity;
  } catch (err) {
    console.error("Error logging activity:", err.message);
  }
};

// Get all activities for a board
exports.getBoardActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ board: req.params.boardId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
