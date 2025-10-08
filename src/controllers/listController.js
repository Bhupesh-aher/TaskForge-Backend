const List = require("../models/List");
const { logActivity } = require("./activityController");


// Create List
exports.createList = async (req, res) => {
  try {
    const { title, board, position } = req.body;

    const list = await List.create({
      title,
      board,
      position
    });

    const io = req.app.get("io");
    io.to(board).emit("listCreated", list);

    await logActivity({
      board: list.board,
      user: req.user._id,
      action: "created",
      targetType: "list",
      targetName: title,
      message: `${req.user.name} created a new list "${title}"`,
      io: req.app.get("io")
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

    await logActivity({
    board: deletedList.board,
    user: req.user._id,
    action: "deleted",
    targetType: "list",
    targetName: deletedList.title,
    message: `${req.user.name} deleted the list "${deletedList.title}"`,
    io: req.app.get("io")
  });


    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json({ message: "List deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getListsByBoard = async (req, res) => {
  try {
    const lists = await List.find({ board: req.params.boardId });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};