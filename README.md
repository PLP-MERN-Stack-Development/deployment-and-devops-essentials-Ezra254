# 🚀 MERN Task Manager - Deployment and DevOps Project

A full-stack MERN (MongoDB, Express, React, Node.js) Task Management application with complete CI/CD pipelines, production-ready configurations, and deployment automation.

## 📋 Project Overview

This is a production-ready Task Management application built with modern web technologies. The application allows users to create, manage, and track tasks with features like status tracking, priority levels, due dates, and comprehensive statistics.

### Features

- ✅ **Task Management**: Create, read, update, and delete tasks
- 📊 **Dashboard**: View statistics and recent tasks
- 🎯 **Priority Levels**: Low, Medium, High priority classification
- 📅 **Due Dates**: Set and track task deadlines
- 🔍 **Filtering & Sorting**: Filter by status/priority, sort by various criteria
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & Reactive**: Built with React and optimized for performance
- 🔒 **Secure**: Production-ready security headers and error handling
- 📈 **Monitoring**: Health check endpoints and logging

## 🏗️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Helmet** for security headers
- **Morgan** for HTTP request logging
- **Express Validator** for input validation
- **CORS** for cross-origin resource sharing

### Frontend
- **React 18** with Hooks
- **React Router** for navigation
- **Vite** for fast development and optimized builds
- **Axios** for API communication
- **React Hot Toast** for notifications
- **Date-fns** for date formatting
- **CSS3** with modern responsive design

### DevOps
- **GitHub Actions** for CI/CD
- **Environment Variables** for configuration
- **Health Check Endpoints** for monitoring
- **Production Optimizations** (code splitting, error handling)

## 📁 Project Structure

```
.
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── server.js         # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── App.jsx       # Main app component
│   ├── public/
│   └── package.json
├── .github/
│   └── workflows/        # CI/CD pipelines
├── deployment/           # Deployment configs
├── monitoring/          # Monitoring scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd deployment-and-devops-essentials-Ezra254
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set Up Environment Variables**

   **Backend** (`backend/.env`):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend** (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Start Development Servers**

   **Backend** (in `backend/` directory):
   ```bash
   npm run dev
   ```

   **Frontend** (in `frontend/` directory):
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/api/health

## 🧪 API Endpoints

### Health Check
- `GET /api/health` - Check API health status

### Tasks
- `GET /api/tasks` - Get all tasks (with optional query params: status, priority, sort)
- `GET /api/tasks/stats` - Get task statistics
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Query Parameters
- `status`: Filter by status (pending, in-progress, completed)
- `priority`: Filter by priority (low, medium, high)
- `sort`: Sort order (e.g., `-createdAt`, `title`, `-title`)

## 🚢 Deployment

**Recommended Setup:**
- **Frontend**: Vercel (optimized for React/Vite)
- **Backend**: Render (easy setup, free tier available)

**📖 For detailed step-by-step deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

### Quick Deployment Summary

#### Backend on Render
1. Create Web Service on Render
2. Connect GitHub repository
3. Set root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `MONGODB_URI` (from MongoDB Atlas)
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your Vercel URL)
   - `PORT=10000`

#### Frontend on Vercel
1. Import GitHub repository to Vercel
2. Set root directory: `frontend`
3. Build command: `npm run build` (auto-detected)
4. Output directory: `dist` (auto-detected)
5. Add environment variable: `VITE_API_URL` (your Render backend URL)
6. Deploy

**See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions with screenshots and troubleshooting.**

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflows for:

### Continuous Integration
- **Backend CI** (`.github/workflows/backend-ci.yml`): Tests backend code on push/PR
- **Frontend CI** (`.github/workflows/frontend-ci.yml`): Lints and builds frontend on push/PR

### Continuous Deployment
- **Backend CD** (`.github/workflows/backend-cd.yml`): Deploys backend on main branch push
- **Frontend CD** (`.github/workflows/frontend-cd.yml`): Builds frontend for deployment on main branch push

### Setting Up CI/CD
1. Push code to GitHub
2. Workflows run automatically on push/PR
3. Check workflow status in GitHub Actions tab
4. Configure deployment secrets in repository settings

## 📊 Monitoring

### Health Check
The API includes a health check endpoint at `/api/health` that returns:
- Status
- Timestamp
- Uptime
- Environment

### Monitoring Script
Use the provided health check script:
```bash
node monitoring/health-check.js
```

Set `API_URL` environment variable to your deployed backend URL:
```bash
API_URL=https://deployment-and-devops-essentials-ezra254.onrender.com node monitoring/health-check.js
```

### Live Health Check
Monitor your backend health in real-time:
- **Health Endpoint**: https://deployment-and-devops-essentials-ezra254.onrender.com/api/health
- **Expected Response**: `{"status":"OK","timestamp":"...","uptime":...,"environment":"production"}`

### Monitoring Setup
- **Backend Logs**: Available in Render dashboard → Logs tab
- **Frontend Logs**: Available in Vercel dashboard → Deployments → Function Logs
- **Health Monitoring**: Use uptime monitoring services like UptimeRobot to monitor the health endpoint

## 🔒 Security Features

- **Helmet.js**: Security HTTP headers
- **CORS**: Configured for specific origins
- **Input Validation**: Express Validator for all inputs
- **Error Handling**: Centralized error handling middleware
- **Environment Variables**: Sensitive data in environment variables

## 📝 Production Optimizations

### Backend
- ✅ Connection pooling for MongoDB
- ✅ Error handling middleware
- ✅ Request logging (Morgan)
- ✅ Security headers (Helmet)
- ✅ Environment-based configuration
- ✅ Graceful shutdown handling

### Frontend
- ✅ Code splitting (vendor and utils chunks)
- ✅ Production build optimization
- ✅ Environment variables
- ✅ Error boundaries
- ✅ Loading states
- ✅ Responsive design

## 🛠️ Development

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📸 Screenshots

### Deployed Application
- Frontend: https://deploymentanddevopsessentials-joszi6a0s-ezra254s-projects.vercel.app
- Backend API: https://deployment-and-devops-essentials-ezra254.onrender.com

### CI/CD Pipeline
GitHub Actions workflows are configured and running:
- Frontend CI: Lints and builds on every push/PR
- Backend CI: Validates code quality on every push/PR
- Automatic deployments triggered on push to main branch

_Add screenshots of your CI/CD pipeline runs from GitHub Actions here_

## 🔗 Deployment URLs

✅ **Application is Live!**

- **Frontend URL**: [https://deploymentanddevopsessentials-joszi6a0s-ezra254s-projects.vercel.app](https://deploymentanddevopsessentials-joszi6a0s-ezra254s-projects.vercel.app)
- **Backend API URL**: [https://deployment-and-devops-essentials-ezra254.onrender.com](https://deployment-and-devops-essentials-ezra254.onrender.com)
- **Health Check**: [https://deployment-and-devops-essentials-ezra254.onrender.com/api/health](https://deployment-and-devops-essentials-ezra254.onrender.com/api/health)
- **API Root**: [https://deployment-and-devops-essentials-ezra254.onrender.com](https://deployment-and-devops-essentials-ezra254.onrender.com)

### Deployment Platforms
- **Frontend**: Vercel (React/Vite)
- **Backend**: Render (Node.js/Express)
- **Database**: MongoDB Atlas

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)

## ✅ Assignment Checklist

- [x] Complete MERN stack application
- [x] Production-ready backend with error handling
- [x] Optimized React frontend with code splitting
- [x] Environment variables configured
- [x] CI/CD pipelines set up
- [x] Health check endpoints
- [x] Security headers and best practices
- [x] Responsive and user-friendly UI
- [x] Deployment configurations
- [x] Comprehensive documentation
- [x] **Frontend deployed to Vercel**: https://deploymentanddevopsessentials-joszi6a0s-ezra254s-projects.vercel.app
- [x] **Backend deployed to Render**: https://deployment-and-devops-essentials-ezra254.onrender.com
- [x] **MongoDB Atlas connected and working**
- [x] **CORS configured and working**
- [x] **Application fully functional**

## 📄 License

This project is created for educational purposes as part of the Deployment and DevOps Essentials course.

## 👤 Author

Created as part of Week 7 Assignment - Deployment and DevOps Essentials

---

**Note**: Remember to:
1. Set up MongoDB Atlas cluster
2. Configure environment variables in your deployment platforms
3. Update frontend API URL after backend deployment
4. Test all functionality after deployment
5. Monitor application health regularly
