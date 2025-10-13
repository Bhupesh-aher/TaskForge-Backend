# 🧩 TaskForge – Trello-Style Project Management Backend

**Live Backend:** [https://taskforge-backend-jjdh.onrender.com](https://taskforge-backend-jjdh.onrender.com)  
**Swagger API Docs:** [https://taskforge-backend-jjdh.onrender.com/api/docs](https://taskforge-backend-jjdh.onrender.com/api/docs)

TaskForge is a **production-ready Trello-style backend** built using the **MERN stack architecture**.  
It powers the frontend app by providing APIs for managing **boards, lists, cards, members, notifications**, and **real-time collaboration**, all secured with **JWT authentication** and **Socket.io** for live updates.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend Framework** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Real-Time Communication** | Socket.io |
| **File Storage** | Cloudinary |
| **Documentation** | Swagger UI |
| **Security** | bcrypt.js, Helmet, CORS |
| **Other Tools** | Nodemon, dotenv, ESLint |

---

## ⚙️ Core Features

✅ **Board Management** – Create, edit, and share boards with team members  
✅ **List & Card System** – Add lists and drag-and-drop cards within boards  
✅ **User Authentication** – JWT-secured login and registration  
✅ **Real-Time Updates** – Sync changes instantly via Socket.io  
✅ **Activity Logs** – Track card creation, updates, and deletions  
✅ **Notifications System** – Real-time board and card updates  
✅ **File Uploads** – Cloudinary-based attachment handling  
✅ **Pagination & Search** – Optimized endpoints with query filters  
✅ **Dynamic CORS** – Auto-switch between dev and prod environments  
✅ **Modular Structure** – Cleanly organized controllers, routes & middleware

---

## 🧱 Project Architecture

src/
┣ controllers/ → Route logic (auth, boards, lists, cards, etc.)
┣ models/ → MongoDB schemas (User, Board, Card, etc.)
┣ routes/ → Express routes grouped by feature
┣ middleware/ → JWT protection, error handling
┣ utils/ → Helpers (Cloudinary, pagination)
┣ config/ → Swagger config, DB connection
┣ app.js → Core express configuration (CORS, routes)
┗ server.js → Socket.io setup and server startup



---

## 📡 API Overview

### 🔐 Auth Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login user and return JWT |

### 🧩 Board Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/boards` | Fetch all boards |
| `POST` | `/api/boards` | Create new board |
| `GET` | `/api/boards/:id` | Fetch board with lists and cards |
| `PUT` | `/api/boards/:id/members` | Add member to board |

### 🗂️ List Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/lists` | Create new list |
| `PUT` | `/api/lists/:id` | Update list title/order |
| `DELETE` | `/api/lists/:id` | Delete list |

### 🗃️ Card Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/cards` | Create new card |
| `PUT` | `/api/cards/:id` | Update card details |
| `PATCH` | `/api/cards/:id/move` | Move card between lists |
| `DELETE` | `/api/cards/:id` | Delete card |
| `PUT` | `/api/cards/:id/attachments` | Update/remove attachments |

### 🔔 Notification Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/notifications` | Fetch all notifications |
| `PUT` | `/api/notifications/:id/read` | Mark as read |

### 🕒 Activity Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/activities/:boardId` | Fetch board activity logs |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Bhupesh-aher/TaskForge-Backend.git
cd TaskForge-Backend


2️⃣ Install Dependencies


npm install



3️⃣ Configure Environment Variables

# Environment
NODE_ENV=development
PORT=5000

# Database
MONGO_URI_DEV=your-local-mongo-uri
MONGO_URI_PROD=your-production-mongo-uri

# JWT Secret
JWT_SECRET=your-jwt-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Client URLs
CLIENT_URL_DEV=http://localhost:5173
CLIENT_URL_PROD=https://task-forge.vercel.app


4️⃣ Run the App

Development Mode


npm run dev

Runs with NODE_ENV=development, connecting to local DB & frontend.



Production (Render)

Render automatically sets:


NODE_ENV=production


Connects to hosted DB and live frontend.


☁️ Deployment
| Service              | Description                  |
| -------------------- | ---------------------------- |
| **Backend Hosting**  |  Render 
| **Frontend Hosting** |  Vercel |
| **Database**         | MongoDB Atlas                |
| **Media Storage**    | Cloudinary                   |



📘 Swagger API Docs

Access all endpoints directly at:   By running the code in development mode
👉 http://localhost:5173/api/docs



🧠 Developer Notes

Dynamic environment switching via NODE_ENV

CORS configured for both local and production

Socket.io integrated for real-time updates

Modular structure for easy scaling
