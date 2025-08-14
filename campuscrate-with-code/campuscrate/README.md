# CampusCrate (MERN) – Lost & Found

## Getting Started

### Backend
```bash
cd backend
cp .env .env.local # fill values or edit .env
npm i
npm run dev
```
API runs on `http://localhost:4000`.

### Frontend (Vite + React)
```bash
cd frontend
npm i
npm run dev
```
App runs on `http://localhost:5173` by default.

Set `VITE_API_BASE` in `frontend/.env` to your API URL (default matches above).

---

## REST Endpoints
- `POST /api/auth/register` `{ name, email, password }`
- `POST /api/auth/login` `{ email, password }`
- `GET /api/items?type=lost|found&q=...`
- `GET /api/items/:id`
- `POST /api/items` (auth) multipart form fields for photo
- `PATCH /api/items/:id/status` (auth) `{ status }`
- `POST /api/claims` (auth) `{ itemId, message, answer }`
- `GET /api/claims/item/:itemId` (auth)
- `PATCH /api/claims/:claimId` (auth) `{ status }`
- `GET /api/admin/dashboard` (admin)
- `PATCH /api/admin/block/:userId` (admin)
- `POST /api/report` (auth)

---

## Notes
- Image upload uses Cloudinary if keys are present; otherwise requests still work but `photoUrl` may be empty.
- Simple text index on items supports search across title/description.
- This is an MVP scaffold—tighten validation, rate limiting, and moderation for production.
