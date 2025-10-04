const Board = require("../models/Board");
const List = require("../models/List");
const User = require("../models/User");
const { logActivity } = require("./activityController");
const { createNotification } = require("./notificationController");


// Create Board
exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      owner: req.user._id,
      members: [req.user._id]
    });

    await logActivity({
      board: board._id,
      user: req.user._id,
      action: "created",
      targetType: "board",
      targetName: board.title,
      message: `${req.user.name} created a new board "${board.title}"`,
      io: req.app.get("io")
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
// Get single Board with Lists
exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      members: req.user._id
    }).populate("members", "name email");

    if (!board) return res.status(404).json({ message: "Board not found or access denied" });

    const lists = await List.find({ board: board._id }).sort("position");
    res.json({ board, lists });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.addMember = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { email } = req.body; // email of user to add

    // Check if board exists and requester is owner
    const board = await Board.findOne({
      _id: boardId,
      owner: req.user._id
    });
    if (!board) {
      return res.status(403).json({ message: "Not authorized to add members to this board" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already a member
    if (board.members.includes(user._id)) {
      return res.status(400).json({ message: "User is already a member of this board" });
    }

    // Add user to board members
    board.members.push(user._id);
    await board.save();

    
    await createNotification({
      receiver: user._id,
      sender: req.user._id,
      board: board._id,
      type: "board_invite",
      message: `${req.user.name} added you to board "${board.title}"`,
      io: req.app.get("io")
    });

    res.json({ message: "Member added successfully", board });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

