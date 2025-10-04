const express = require("express");
const { getBoardActivities } = require("../controllers/activityController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:boardId", protect, getBoardActivities);

module.exports = router;
