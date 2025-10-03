const express = require("express");
const { createList, updateList, deleteList } = require("../controllers/listController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createList);       // Create new list
router.put("/:id", protect, updateList);     // Update list title or position
router.delete("/:id", protect, deleteList);  // Delete list

module.exports = router;
