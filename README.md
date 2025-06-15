<h1 align="center">📝 Blog App Backend</h1>

<p align="center">
  A full-featured Node.js backend API for a blog platform, supporting user authentication, profile management, and post creation. Built with ❤️ using Express.js and MongoDB.
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/your-username/blog-app-backend?style=for-the-badge&color=blue" />
  <img src="https://img.shields.io/github/languages/top/your-username/blog-app-backend?style=for-the-badge&color=orange" />
  <img src="https://img.shields.io/github/license/your-username/blog-app-backend?style=for-the-badge&color=brightgreen" />
</p>

---

## 🔥 Tech Stack

- 🧠 Node.js
- ⚡ Express.js
- 🛢️ MongoDB + Mongoose
- 🔐 JWT (Auth)
- 🍪 Cookie-based sessions
- 🧹 Validator for input validation

---

## 📁 Project Structure

```
blog-app-backend/
├── controllers/        # Logic (auth, profile, posts)
├── models/             # Mongoose schemas (User, Post)
├── routes/             # Express routes
├── utils/              # Validation logic
├── middlewares/        # Auth + error handlers
├── config/             # MongoDB connection
├── .env                # Secrets and configs
└── app.js              # Entry point
```

---

## ⚙️ Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/blog-app-backend.git
cd blog-app-backend
npm install
```

2. Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blog
JWT_SECRET=your_jwt_secret
```

3. Run the server:

```bash
npm run dev   # development
npm start     # production
```

---

## 🧪 API Endpoints

### 🔐 Auth

| Method | Route       | Description       |
|--------|-------------|-------------------|
| POST   | /api/signup | Register user     |
| POST   | /api/login  | Login + JWT token |
| POST   | /api/logout | Logout user       |

### 👤 Profile

| Method | Route              | Description       |
|--------|--------------------|-------------------|
| GET    | /api/profile/view  | View profile      |
| PATCH  | /api/profile/edit  | Edit profile      |

### 📝 Posts

| Method | Route         | Description        |
|--------|---------------|--------------------|
| GET    | /api/posts    | Get all posts      |
| GET    | /api/posts/:id| Get single post    |
| POST   | /api/posts    | Create new post    |
| PATCH  | /api/posts/:id| Update a post      |
| DELETE | /api/posts/:id| Delete a post      |

---

## 🧠 Architecture

<p align="center">
  <img src="./assets/architecture.png.png" alt="Architecture Diagram" width="800"/>
</p>

---

## 🛡️ Security

- JWT Authentication
- HTTP-only Cookies
- Password hashing with Bcrypt
- Input validation with `validator`

---

## 📚 License

This project is licensed under the [MIT License](LICENSE).

---

## 🚀 Author

Made with 💻 by [Satwik Mohanty](https://github.com/Satwik290)
