# Quick Setup Guide

## 🚀 Quick Start

### 1. Install All Dependencies
```bash
npm run install:all
```

Or manually:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Set Up Environment Variables

**Backend** - Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
FRONTEND_URL=http://localhost:3000
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## 📝 MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get your connection string
6. Replace `<password>` and `<dbname>` in the connection string
7. Add it to `backend/.env` as `MONGODB_URI`

## ✅ Verify Installation

1. Check backend health: http://localhost:5000/api/health
2. Check frontend loads: http://localhost:3000
3. Create a test task in the UI
4. Verify it appears in the dashboard

## 🚢 Deployment Checklist

Before deploying:

- [ ] Set up MongoDB Atlas cluster
- [ ] Configure backend environment variables on deployment platform
- [ ] Configure frontend environment variables (VITE_API_URL)
- [ ] Test backend health endpoint
- [ ] Test frontend can connect to backend
- [ ] Verify CORS settings match your frontend URL
- [ ] Test all CRUD operations
- [ ] Check CI/CD pipelines are running

## 🔧 Troubleshooting

### Backend won't start
- Check MongoDB connection string is correct
- Verify PORT is not already in use
- Check all environment variables are set

### Frontend can't connect to backend
- Verify backend is running
- Check VITE_API_URL matches backend URL
- Check CORS settings in backend
- Check browser console for errors

### MongoDB connection issues
- Verify IP is whitelisted in MongoDB Atlas
- Check database user credentials
- Verify connection string format

