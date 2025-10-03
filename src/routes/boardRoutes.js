const express = require("express");
const { createBoard, getBoards, getBoardById, addMember } = require("../controllers/boardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBoard);
router.get("/", protect, getBoards);
router.get("/:id", protect, getBoardById);
router.post("/:boardId/members", protect, addMember); 

module.exports = router;
