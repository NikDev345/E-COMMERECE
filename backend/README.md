# E-COMMERECE Backend

Simple Express + MongoDB backend for the E-COMMERECE project.

Quick start:
1. Copy .env.example to .env and set MONGO_URI and PORT.
2. Install:
   npm install
3. Seed sample products (optional):
   npm run seed
4. Start server:
   npm run dev
   or
   npm start

API endpoints:
- GET  /api/products
- GET  /api/products/:id
- POST /api/products
- PUT  /api/products/:id
- DELETE /api/products/:id

Example:
curl http://localhost:5000/api/products

CORS is enabled so the frontend can call these endpoints directly. For production, set CORS origins appropriately and secure the database credentials.