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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = req.query.type || ""; // optional filter by action type

    const query = { board: req.params.boardId };
    if (filter) query.action = filter; // e.g., "created", "deleted"

    const total = await Activity.countDocuments(query);
    const activities = await Activity.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      activities
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

