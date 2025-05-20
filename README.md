# 📰 Blog Platform – Microservices Architecture

A full-stack, scalable Blog Platform built with **React.js**, **Node.js**, and **Microservices Architecture**. The system separates read and write operations, applies strict security and rate-limiting, and is designed to scale efficiently for real-world blogging needs.

---

## 👨‍💻 Author

**Shiv Patel**

---

## 🧱 Architecture Overview

This system follows the **Microservices pattern** to separate responsibilities across three main services:

### 1. 🌀 API Gateway
- Acts as the entry point to all backend services
- Handles **authentication**, **rate limiting**, **request routing**, and **logging**
- Protects services with middleware like `helmet`, `cors`, `express-rate-limit`, and Redis-backed rate limiting

### 2. 📝 Post Management Service (Write Layer)
- Handles all **authenticated user interactions**:
  - Create, edit, delete posts
  - Like/unlike
  - Commenting
- Uses:
  - `MongoDB` via Mongoose
  - JWT for token-based auth
  - Cloudinary for image storage
  - RabbitMQ for event messaging (via `amqplib`)
  - Joi for request validation

### 3. 📚 Post Public Service (Read Layer)
- Serves all **non-authenticated** features:
  - View latest posts
  - Search by tags, title, slug
  - Fetch post details
- Reduces load on the write server
- Optimized for **high read scalability**

---

## 🎨 Frontend – React.js

### Key Highlights:
- Built with modern React (`react-router-dom`, `axios`, etc.)
- **Optimized Rendering:** Low re-renders with `memo`, `lazy`, `Suspense`
- **Animations:** Smooth transitions using `Framer Motion` (or similar)
- **Responsive Design:** TailwindCSS / custom styling
- **Error Handling:** Toast notifications and fallback UIs
- **JWT Integration:** Full auth token flow using interceptors

---

## 📦 Tech Stack

| Layer     | Tech Used                                   |
|-----------|---------------------------------------------|
| Frontend  | React.js, Axios, TailwindCSS, Framer Motion |
| API Gateway | Node.js, Express, Helmet, Redis, JWT         |
| Post Management | Node.js, Express, MongoDB, RabbitMQ, Joi  |
| Post Public | Node.js, Express, MongoDB (Read Optimized)   |
| Auth | JWT, Bcrypt, User service (separate)            |

---

## 🔐 Security & Performance
- Redis + `express-rate-limit` for DDoS protection
- Helmet for securing HTTP headers
- API-level token authentication
- Microservice isolation to ensure high availability

---

## ⚙️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/blog-platform.git
cd blog-platform

# ENV files must be set up for:
# - API Gateway
# - Post Management Service
# - Post Public Service
# - Frontend React App

# Start backend services
cd api-gateway && npm install && npm run dev
cd ../post-management && npm install && npm run dev
cd ../post-public && npm install && npm run dev

# Start frontend
cd ../client && npm install && npm start

🧪 Future Improvements|

Add Notification Microservice

Support for scheduled publishing

Implement GraphQL Gateway (optional)

SEO enhancements on frontend

🏆 Achievements

🔥 Built using clean and scalable architecture

🚀 Smooth animations and lazy-loaded React UI

🧠 Developed with performance, modularity, and real-world security in mind

