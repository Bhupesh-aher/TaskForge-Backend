const Board = require("../models/Board");
const List = require("../models/List");

// Create Board
exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      owner: req.user._id,
      members: [req.user._id]
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Boards for user
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ members: req.user._id });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single Board with Lists
exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate("members", "name email");
    if (!board) return res.status(404).json({ message: "Board not found" });

    const lists = await List.find({ board: board._id }).sort("position");
    res.json({ board, lists });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
