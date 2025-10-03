const Card = require("../models/Card");

// Create Card
exports.createCard = async (req, res) => {
  try {
    const { title, description, list, position } = req.body;

    const card = await Card.create({
      title,
      description,
      list,
      position
    });

    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Card
exports.updateCard = async (req, res) => {
  try {
    const { title, description, position, dueDate, assignedTo } = req.body;

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { title, description, position, dueDate, assignedTo },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Card
exports.deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

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
