const express = require("express");
const { createCard, updateCard, deleteCard, getCardsByList, updateAttachments, moveCard } = require("../controllers/cardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Card management APIs
 */

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Create a new card under a list
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               listId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Card created successfully
 */

/**
 * @swagger
 * /cards/{id}:
 *   put:
 *     summary: Update card details (title, description, dueDate, assignedTo)
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Card updated successfully
 */


router.post("/", protect, createCard);              // Create card
router.put("/:id", protect, updateCard);            // Update card
router.delete("/:id", protect, deleteCard);         // Delete card
router.get("/list/:listId", protect, getCardsByList); // Get all cards in a list
router.put("/:id/attachments", protect, updateAttachments);
router.patch("/:id/move", moveCard);                    // Move card to another list


module.exports = router;
