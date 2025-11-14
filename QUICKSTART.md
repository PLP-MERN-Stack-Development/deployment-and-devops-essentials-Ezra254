# 🚀 Quick Start Guide

Get your MERN stack application up and running quickly!

## Prerequisites

- Node.js 18+ and npm 9+
- MongoDB Atlas account (free tier works)
- Git

## 5-Minute Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd deployment-and-devops-essentials-Ezra254

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (FREE tier)
4. Create a database user (username/password)
5. Add IP address `0.0.0.0/0` to Network Access (for development)
6. Get your connection string from "Connect" → "Connect your application"

### 3. Configure Environment Variables

**Backend:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:3000
LOG_LEVEL=info
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Next Steps

1. ✅ Test the application locally
2. ✅ Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
3. ✅ Set up CI/CD with GitHub Actions
4. ✅ Deploy to production

## Troubleshooting

**Backend won't start:**
- Check MongoDB connection string
- Verify environment variables
- Check if port 5000 is available

**Frontend can't connect:**
- Verify `REACT_APP_API_URL` in `.env`
- Ensure backend is running
- Check CORS settings

**Database connection issues:**
- Verify MongoDB Atlas network access
- Check connection string format
- Ensure database user has permissions

## Need Help?

- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide
- See [MAINTENANCE.md](./MAINTENANCE.md) for maintenance procedures
- Check the main [README.md](./README.md) for full documentation

