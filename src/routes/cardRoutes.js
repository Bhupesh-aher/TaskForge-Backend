const express = require("express");
const { createCard, updateCard, deleteCard, getCardsByList } = require("../controllers/cardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createCard);              // Create card
router.put("/:id", protect, updateCard);            // Update card
router.delete("/:id", protect, deleteCard);         // Delete card
router.get("/list/:listId", protect, getCardsByList); // Get all cards in a list

module.exports = router;
