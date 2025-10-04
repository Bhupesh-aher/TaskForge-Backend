const Card = require("../models/Card");

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

    // Emit event to board room
    const io = req.app.get("io");
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
