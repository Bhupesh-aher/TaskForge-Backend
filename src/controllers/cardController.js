const Card = require("../models/Card");
const { logActivity } = require("./activityController");
const { createNotification } = require("./notificationController");


// Create Card
exports.createCard = async (req, res) => {
  try {
    const { title, description, list, position, boardId } = req.body;

    const card = await Card.create({
      title,
      description,
      list,
      position
    });

    await logActivity({
      board: boardId,
      user: req.user._id,
      action: "created",
      targetType: "card",
      targetName: title,
      message: `${req.user.name} created a new card "${title}"`,
      io: req.app.get("io")
    });

    // Emit event to board room
    const io = req.app.get("io");
    io.to(boardId).emit("cardCreated", card);

    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Card
exports.updateCard = async (req, res) => {
  try {
    const { title, description, position, dueDate, assignedTo, boardId } = req.body;

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { title, description, position, dueDate, assignedTo },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    const io = req.app.get("io");

    // ✅ Log the activity (you already had this)
    await logActivity({
      board: boardId,
      user: req.user._id,
      action: "updated",
      targetType: "card",
      targetName: updatedCard.title,
      message: `${req.user.name} updated the card "${updatedCard.title}"`,
      io
    });

    // ✅ NEW: Send notifications to assigned users (if any)
    if (assignedTo && assignedTo.length > 0) {
      for (const receiverId of assignedTo) {
        // Avoid notifying the person who made the change (self-assignment)
        if (receiverId.toString() === req.user._id.toString()) continue;

        await createNotification({
          receiver: receiverId,
          sender: req.user._id,
          board: boardId,
          type: "card_assignment",
          message: `${req.user.name} assigned you to card "${updatedCard.title}"`,
          io
        });
      }
    }

    // ✅ Emit update event to board members
    io.to(boardId).emit("cardUpdated", updatedCard);

    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete Card
exports.deleteCard = async (req, res) => {
  try {
    const { boardId } = req.body;

    const deletedCard = await Card.findByIdAndDelete(req.params.id);

      await logActivity({
        board: boardId,
        user: req.user._id,
        action: "deleted",
        targetType: "card",
        targetName: deletedCard.title,
        message: `${req.user.name} deleted the card "${deletedCard.title}"`,
        io: req.app.get("io")
    });


    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Emit event to board room
    const io = req.app.get("io");
    io.to(boardId).emit("cardDeleted", { cardId: req.params.id });

    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get Cards by List
exports.getCardsByList = async (req, res) => {
  try {
    const cards = await Card.find({ list: req.params.listId }).sort("position");
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add or update card attachments manually (optional helper)
exports.updateAttachments = async (req, res) => {
  try {
    const { attachments, boardId } = req.body; // Array of {url, fileName}

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { attachments },
      { new: true }
    );

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Emit socket event so others see updated attachments instantly
    const io = req.app.get("io");
    io.to(boardId).emit("cardUpdated", card);

    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
