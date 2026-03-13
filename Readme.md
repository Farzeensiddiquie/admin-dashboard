# Task Management Admin Dashboard

A full-stack **Task Management Admin Dashboard** built to help administrators efficiently create, organize, and track tasks from a centralized interface.

The system provides task scheduling, priority management, and status tracking through a clean and responsive dashboard.

---

## Features

- Secure user authentication
- Create, update, and delete tasks
- Task priority management
- Task status tracking
- Responsive admin dashboard interface
- RESTful API architecture

---

## Tech Stack

**Frontend**
- React.js
- JavaScript
- Tailwind CSS / Bootstrap

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication**
- JWT (JSON Web Token)
- Bcrypt

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Farzeensiddiquie/admin-dashboard.git
cd admin-dashboard
```

### Backend setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## API Routes

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/auth/register | Register a user |
| POST | /api/auth/login | Login a user |
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

---

## Author

**Farzeen**

---

## License

This project is licensed under the MIT License.