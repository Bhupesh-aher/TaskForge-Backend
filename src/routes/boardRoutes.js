const express = require("express");
const { createBoard, getBoards, getBoardById, addMember } = require("../controllers/boardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Board management APIs
 */

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards for the logged-in user
 *     tags: [Boards]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of boards fetched successfully
 */

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
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
 *     responses:
 *       201:
 *         description: Board created successfully
 */

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get a specific board with lists and cards
 *     tags: [Boards]
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
 *         description: Board details fetched successfully
 *       404:
 *         description: Board not found
 */


router.post("/", protect, createBoard);
router.get("/", protect, getBoards);
router.get("/:id", protect, getBoardById);
router.post("/:boardId/members", protect, addMember); 

module.exports = router;
