🧩 TaskForge – Trello-Style Project Management Backend

TaskForge is a scalable Trello-style backend built using the MERN stack architecture.
It provides APIs for managing boards, lists, cards, members, real-time collaboration, and activity tracking — all secured with JWT authentication and enhanced with WebSockets for live updates.

🚀 Live Demo

(Frontend Integration Coming Soon)
Base API URL:



🏗️ Tech Stack

| Layer                       | Technology              |
| --------------------------- | ----------------------- |
| **Backend Framework**       | Node.js, Express.js     |
| **Database**                | MongoDB (Mongoose ODM)  |
| **Authentication**          | JWT (JSON Web Tokens)   |
| **Real-Time Communication** | Socket.io               |
| **File Storage**            | Cloudinary              |
| **Security**                | bcrypt.js, Helmet, CORS |
| **Other Tools**             | Nodemon, dotenv, ESLint |




⚙️ Core Features

✅ Board Management – Create, edit, and share boards with team members
✅ List & Card System – Add lists and drag-and-drop cards within boards
✅ User Authentication – JWT-based secure login & registration
✅ Real-Time Updates – Live board and card changes via Socket.io
✅ Activity Logs – Tracks actions like card creation, updates, and deletions
✅ Notifications System – Sends real-time notifications for board invites and card assignments
✅ File Uploads – Upload attachments using Cloudinary
✅ Pagination & Search – Optimized endpoints with page, limit & search filters
✅ Modular Structure – Organized controllers, models, and routes for scalability
✅ Secure & Scalable – Built with production-ready practices (error handling, validation, etc.)




🧱 Project Architecture

src/
 ┣ controllers/     → Route logic (boards, lists, cards, auth, notifications)
 ┣ models/          → MongoDB schemas (User, Board, List, Card, Activity)
 ┣ routes/          → Express routes grouped by module
 ┣ middleware/      → Auth middleware (JWT validation)
 ┣ utils/           → Helpers (Cloudinary upload, pagination)
 ┣ config/          → DB connection, Socket.io setup
 ┣ server.js        → App entry point


📡 API Overview

🔐 Auth

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/auth/register` | Register new user         |
| POST   | `/api/auth/login`    | Login user and return JWT |



📋 Boards

| Method | Endpoint                                     | Description                                  |
| ------ | -------------------------------------------- | -------------------------------------------- |
| GET    | `/api/boards?page=1&limit=10&search=keyword` | Fetch user boards with pagination and search |
| POST   | `/api/boards`                                | Create new board                             |
| GET    | `/api/boards/:id`                            | Get specific board with lists and cards      |
| PUT    | `/api/boards/:id/members`                    | Add member to board (owner only)             |



🧩 Lists

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/api/lists`     | Create new list            |
| DELETE | `/api/lists/:id` | Delete list                |
| PUT    | `/api/lists/:id` | Update list title or order |




🗂️ Cards

| Method | Endpoint                     | Description                              |
| ------ | ---------------------------- | ---------------------------------------- |
| POST   | `/api/cards`                 | Create new card                          |
| PUT    | `/api/cards/:id`             | Update card details (assign, move, etc.) |
| PUT    | `/api/cards/:id/attachments` | Update or remove attachments             |
| GET    | `/api/lists/:id/cards`       | Get cards under a specific list          |


🔔 Notifications

| Method | Endpoint                             | Description               |
| ------ | ------------------------------------ | ------------------------- |
| GET    | `/api/notifications?page=1&limit=10` | Get user notifications    |
| PUT    | `/api/notifications/:id/read`        | Mark notification as read |

🕒 Activities

| Method | Endpoint                                                | Description                      |
| ------ | ------------------------------------------------------- | -------------------------------- |
| GET    | `/api/activities/:boardId?page=1&limit=10&type=created` | Paginated activity logs by board |




⚙️ Setup & Installation

# 1️⃣ Clone repo
git clone https://github.com/<Bhupesh-aher>/taskforge-backend.git
cd taskforge-backend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Add environment variables
cp .env.example .env

# 4️⃣ Start dev server
npm run dev


🔐 Environment Variables

| Variable                | Description                 |
| ----------------------- | --------------------------- |
| `MONGO_URI`             | MongoDB connection URI      |
| `JWT_SECRET`            | Secret key for JWT          |
| `CLOUDINARY_NAME`       | Cloudinary cloud name       |
| `CLOUDINARY_API_KEY`    | Cloudinary API key          |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret       |
| `PORT`                  | Server port (default: 5000) |


☁️ Deployment

Backend: Render / Railway / AWS EC2

Frontend (planned): React + Tailwind on Vercel

Database: MongoDB Atlas

Environment: .env for secure credentials

