const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const Card = require("../models/Card");

// Use multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload file to Cloudinary and attach to card
exports.uploadAttachment = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { cardId } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload file buffer to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { folder: "taskforge/attachments" },
        async (error, uploadResult) => {
          if (error) return res.status(500).json({ message: error.message });

          // Save to card
          const card = await Card.findById(cardId);
          if (!card) return res.status(404).json({ message: "Card not found" });

          card.attachments.push({
            url: uploadResult.secure_url,
            fileName: req.file.originalname
          });
          await card.save();

          // Emit socket event
          const io = req.app.get("io");
          io.to(req.body.boardId).emit("cardUpdated", card);

          res.json({ message: "File uploaded successfully", attachment: uploadResult });
        }
      );

      // Stream buffer to Cloudinary
      result.end(req.file.buffer);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
];
