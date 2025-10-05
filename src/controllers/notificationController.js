const Notification = require("../models/Notification");

// Create and send notification
exports.createNotification = async ({ receiver, sender, board, type, message, io }) => {
  try {
    const notification = await Notification.create({ receiver, sender, board, type, message });

    // Emit in real time to receiver
    if (io) io.to(receiver.toString()).emit("notification", notification);

    return notification;
  } catch (err) {
    console.error("❌ Notification error:", err.message);
  }
};

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const total = await Notification.countDocuments({ receiver: req.user._id });
    const notifications = await Notification.find({ receiver: req.user._id })
      .populate("sender", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      notifications
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
