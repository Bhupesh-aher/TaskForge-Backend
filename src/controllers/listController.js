const List = require("../models/List");

// Create List
exports.createList = async (req, res) => {
  try {
    const { title, board, position } = req.body;

    const list = await List.create({
      title,
      board,
      position
    });

    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update List
exports.updateList = async (req, res) => {
  try {
    const { title, position } = req.body;

    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { title, position },
      { new: true }
    );

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete List
exports.deleteList = async (req, res) => {
  try {
    const deletedList = await List.findByIdAndDelete(req.params.id);

    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json({ message: "List deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
