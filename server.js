const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Later restrict to frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // Join a board room
  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
    console.log(`📌 User ${socket.id} joined board ${boardId}`);
  });

  // Leave board room
  socket.on("leaveBoard", (boardId) => {
    socket.leave(boardId);
    console.log(`🚪 User ${socket.id} left board ${boardId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Make io accessible in controllers
app.set("io", io);

httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
