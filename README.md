# 📊 Interactive Product Analytics Dashboard

A full-stack analytics dashboard that tracks user interactions and visualizes feature usage with dynamic filtering.

**Live Demo:** <YOUR_FRONTEND_URL>  
**Backend API:** https://analytics-dashboard-backend-c9x4.onrender.com
**Design Document:** See `DESIGN.md` for detailed architecture.

---

## 🚀 Features

- User registration & login (JWT based)
- Event tracking system
- Interactive analytics dashboard
- Date range filtering
- Gender filtering
- Feature-wise usage bar chart
- Time-series trend line chart
- Persistent filters via cookies
- Responsive dark SaaS UI

---

## 🏗️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Recharts
- Axios

**Backend**
- Node.js
- Express
- PostgreSQL
- pg Pool
- JWT Authentication

**Deployment**
- Frontend: Vercel
- Backend & DB: Render

---

# ⚙️ Local Setup Instructions

## 1️⃣ Clone the repository
```bash
git clone https://github.com/avnisharma890/analytics-dashboard
cd analytics-dashboard
```

## 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env` in `backend/`:
```env
PORT=5000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/analytics_dashboard
JWT_SECRET=supersecret123
```

Start backend:
```bash
npm run dev
```

Backend runs on:
```
http://localhost:5000
```

## 3️⃣ Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` in `frontend/`:
```env
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🌱 Seed Instructions (Dummy Data)

To populate the database with sample users and feature events:
```bash
cd backend
npm run seed
```

This will:
- Clear existing data
- Insert dummy users
- Insert feature click events

After seeding, the dashboard will display meaningful analytics immediately.

---

## 🧠 Architectural Choices (Summary)

Key design decisions include:

- **Event-log based analytics model** for maximum filtering flexibility
- **PostgreSQL connection pooling** for efficient DB access
- **Indexed query paths** for fast aggregations
- **Centralized Axios layer** for consistent auth handling
- **Cookie-based filter persistence** for better UX

For detailed reasoning, see `DESIGN.md`.
