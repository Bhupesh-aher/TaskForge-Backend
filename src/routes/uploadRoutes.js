const express = require("express");
const { uploadAttachment } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/attachment", protect, uploadAttachment);

module.exports = router;
