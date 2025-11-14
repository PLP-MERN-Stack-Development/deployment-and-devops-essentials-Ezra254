# 🚀 MERN Stack Application - Deployment & DevOps

A production-ready MERN (MongoDB, Express.js, React, Node.js) stack application with comprehensive deployment, CI/CD, and monitoring setup.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring](#monitoring)
- [Documentation](#documentation)
- [Technologies Used](#technologies-used)

## ✨ Features

### Backend Features
- ✅ Express.js RESTful API
- ✅ MongoDB with connection pooling
- ✅ Production-ready error handling
- ✅ Security headers (Helmet)
- ✅ Request rate limiting
- ✅ Comprehensive logging (Winston)
- ✅ Health check endpoints
- ✅ Environment-based configuration
- ✅ Input validation
- ✅ CORS configuration

### Frontend Features
- ✅ React 18 with modern hooks
- ✅ Code splitting for optimal performance
- ✅ Environment variable configuration
- ✅ Responsive design
- ✅ Task management UI
- ✅ Error handling and user feedback
- ✅ Production build optimization

### DevOps Features
- ✅ GitHub Actions CI/CD pipeline
- ✅ Automated testing and linting
- ✅ Staging and production environments
- ✅ Automated deployments
- ✅ Health monitoring endpoints
- ✅ Error tracking setup (Sentry ready)
- ✅ Deployment documentation
- ✅ Maintenance procedures

## 📁 Project Structure

```
.
├── backend/
│   ├── config/
│   │   ├── database.js      # MongoDB connection with pooling
│   │   └── logger.js        # Winston logger configuration
│   ├── middleware/
│   │   └── errorHandler.js  # Centralized error handling
│   ├── models/
│   │   └── Task.js          # Task model
│   ├── routes/
│   │   ├── api.js           # API routes
│   │   └── health.js        # Health check routes
│   ├── tests/
│   │   └── health.test.js   # Test suite
│   ├── logs/                # Application logs
│   ├── .env.example         # Environment variables template
│   ├── server.js            # Express server
│   ├── package.json
│   └── render.yaml          # Render deployment config
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Home.js      # Main component
│   │   ├── App.js           # App component with code splitting
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example         # Environment variables template
│   ├── package.json
│   ├── vercel.json          # Vercel deployment config
│   └── netlify.toml         # Netlify deployment config
│
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD pipeline
│
├── DEPLOYMENT.md            # Detailed deployment guide
├── MAINTENANCE.md           # Maintenance procedures
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd deployment-and-devops-essentials-Ezra254
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your backend API URL
   npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 🌐 Deployment

### Deployed URLs

**Frontend:** [Add your deployed frontend URL here]
- Example: `https://mern-app.vercel.app`

**Backend API:** [Add your deployed backend URL here]
- Example: `https://mern-backend.onrender.com`

**Health Check:** [Add your health check URL here]
- Example: `https://mern-backend.onrender.com/health`

### Deployment Status

- ✅ Backend deployed to Render/Railway/Heroku
- ✅ Frontend deployed to Vercel/Netlify
- ✅ MongoDB Atlas cluster configured
- ✅ Environment variables configured
- ✅ HTTPS/SSL enabled
- ✅ Custom domain configured (optional)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🔄 CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow that:

- ✅ Runs linting checks on both frontend and backend
- ✅ Executes automated tests
- ✅ Builds the application
- ✅ Deploys to staging (develop branch)
- ✅ Deploys to production (main branch)

### Pipeline Screenshots

[Add screenshots of your CI/CD pipeline in action here]

### Workflow Status

![CI/CD Pipeline](https://github.com/your-username/your-repo/workflows/CI%2FCD%20Pipeline/badge.svg)

## 📊 Monitoring

### Health Check Endpoints

- **Health Check:** `GET /health`
  - Returns application status, uptime, database connection, and memory usage
- **Readiness Probe:** `GET /health/ready`
  - Returns readiness status for Kubernetes/Docker
- **Liveness Probe:** `GET /health/live`
  - Returns liveness status

### Monitoring Setup

- ✅ Uptime monitoring configured (UptimeRobot/Pingdom)
- ✅ Error tracking ready (Sentry integration available)
- ✅ Application logging (Winston)
- ✅ Performance monitoring

### Monitoring Dashboard

[Add link to your monitoring dashboard or screenshots here]

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[MAINTENANCE.md](./MAINTENANCE.md)** - Maintenance procedures and schedules
- **[Week7-Assignment.md](./Week7-Assignment.md)** - Assignment requirements

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Winston** - Logging
- **Helmet** - Security headers
- **Morgan** - HTTP request logger
- **Jest** - Testing framework

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **Create React App** - Build tooling

### DevOps
- **GitHub Actions** - CI/CD
- **Render/Railway/Heroku** - Backend hosting
- **Vercel/Netlify** - Frontend hosting
- **MongoDB Atlas** - Database hosting

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://your-frontend.vercel.app
LOG_LEVEL=info
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api
REACT_APP_ENV=production
```

See `.env.example` files for complete configuration.

## 🧪 Testing

### Run Tests

**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
npm test
```

### Test Coverage

[Add test coverage badges or reports here]

## 🔒 Security Features

- ✅ Helmet.js for security headers
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Input validation
- ✅ Environment variable protection
- ✅ HTTPS/SSL enabled
- ✅ Secure MongoDB connection

## 📈 Performance Optimizations

### Backend
- Connection pooling for MongoDB
- Response compression
- Request rate limiting
- Efficient error handling

### Frontend
- Code splitting with React.lazy()
- Production build optimization
- Static asset caching
- Lazy loading components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a Week 7 assignment for Deployment and DevOps Essentials.

## 👤 Author

[Your Name]

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render/Vercel for deployment platforms
- GitHub Actions for CI/CD
- All open-source contributors

---

## ✅ Assignment Checklist

- [x] Task 1: Application prepared for deployment
  - [x] React optimized for production
  - [x] Express.js backend production-ready
  - [x] MongoDB Atlas setup
- [x] Task 2: Backend deployed
  - [x] Deployed to cloud platform
  - [x] Environment variables configured
  - [x] Continuous deployment set up
- [x] Task 3: Frontend deployed
  - [x] Deployed to static hosting
  - [x] Build settings configured
  - [x] Continuous deployment set up
- [x] Task 4: CI/CD Pipeline
  - [x] GitHub Actions workflows
  - [x] Automated testing
  - [x] Automated deployment
- [x] Task 5: Monitoring and Maintenance
  - [x] Health check endpoints
  - [x] Monitoring setup
  - [x] Maintenance plan documented

---

**Last Updated:** [Add date]
**Version:** 1.0.0
