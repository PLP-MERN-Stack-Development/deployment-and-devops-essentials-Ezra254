# 🚀 Deployment Guide

This guide covers the complete deployment process for the MERN stack application.

## 📋 Prerequisites

1. **Accounts Required:**
   - GitHub (for source code and CI/CD)
   - MongoDB Atlas (for database hosting)
   - Render/Railway/Heroku (for backend hosting)
   - Vercel/Netlify (for frontend hosting)

2. **CLI Tools:**
   - Node.js (v18 or higher)
   - npm (v9 or higher)
   - Git

## 🗄️ Task 1: MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project (e.g., "MERN Stack App")
4. Click "Build a Database"
5. Choose the **FREE** tier (M0)
6. Select a cloud provider and region (choose closest to your deployment region)
7. Click "Create Cluster"

### Step 2: Configure Database Access

1. Go to **Database Access** in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password (save these!)
5. Set user privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### Step 3: Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add specific IPs of your hosting services
5. Click "Confirm"

### Step 4: Get Connection String

1. Go to **Database** in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with your database name (e.g., "mernapp")

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/mernapp?retryWrites=true&w=majority
```

## 🔧 Task 2: Backend Deployment (Render)

### Step 1: Prepare Backend

1. Ensure all environment variables are set in `.env.example`
2. Test locally: `cd backend && npm install && npm start`

### Step 2: Deploy to Render

1. Go to [Render](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `mern-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free (or paid for better performance)

5. **Environment Variables** (add these):
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your-mongodb-connection-string
   FRONTEND_URL=https://your-frontend-url.vercel.app
   LOG_LEVEL=info
   ```

6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://mern-backend.onrender.com`)

### Step 3: Configure Custom Domain (Optional)

1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your domain
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

### Step 4: Enable Auto-Deploy

1. In Render dashboard, go to your service
2. Click "Settings" → "Auto-Deploy"
3. Ensure "Auto-Deploy" is enabled
4. Select branch (usually `main` or `master`)

## 🎨 Task 3: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Update `.env.production` with your backend URL:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   REACT_APP_ENV=production
   ```

2. Test build locally:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

5. **Environment Variables** (add these):
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   REACT_APP_ENV=production
   ```

6. Click "Deploy"
7. Wait for deployment to complete
8. Copy your frontend URL (e.g., `https://mern-app.vercel.app`)

### Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

### Step 4: Enable Auto-Deploy

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Git"
3. Ensure "Production Branch" is set correctly
4. Auto-deploy is enabled by default

## 🔄 Task 4: CI/CD Pipeline Setup

### Step 1: GitHub Actions Configuration

The CI/CD pipeline is already configured in `.github/workflows/ci.yml`. It includes:

- **Linting**: ESLint checks for both frontend and backend
- **Testing**: Automated test runs
- **Building**: Build verification
- **Deployment**: Automatic deployment to staging/production

### Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Add the following secrets:

   **Backend Secrets:**
   - `RENDER_API_KEY`: Your Render API key (from Render dashboard → Account Settings → API Keys)
   - `RENDER_SERVICE_ID_STAGING`: Your staging service ID (from Render service URL)
   - `RENDER_SERVICE_ID_PRODUCTION`: Your production service ID
   - `MONGODB_URI_TEST`: MongoDB connection string for testing

   **Frontend Secrets:**
   - `VERCEL_TOKEN`: Your Vercel token (from Vercel dashboard → Settings → Tokens)
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID
   - `REACT_APP_API_URL`: Your production backend URL

### Step 3: Branch Strategy

- **`main` branch**: Production deployments
- **`develop` branch**: Staging deployments
- **Feature branches**: CI checks only (no deployment)

### Step 4: Rollback Strategy

**Render (Backend):**
1. Go to Render dashboard → Your service
2. Click "Manual Deploy" → "Deploy previous release"
3. Select the previous successful deployment

**Vercel (Frontend):**
1. Go to Vercel dashboard → Your project
2. Click "Deployments"
3. Find the previous successful deployment
4. Click "..." → "Promote to Production"

## 📊 Task 5: Monitoring and Maintenance

### Health Check Endpoints

The backend includes health check endpoints:

- **Health Check**: `GET /health`
- **Readiness Probe**: `GET /health/ready`
- **Liveness Probe**: `GET /health/live`

### Uptime Monitoring

1. **UptimeRobot** (Free):
   - Sign up at [UptimeRobot](https://uptimerobot.com)
   - Add a new monitor:
     - Type: HTTP(s)
     - URL: `https://your-backend-url.onrender.com/health`
     - Interval: 5 minutes
   - Add email/SMS alerts

2. **Pingdom** or **StatusCake** (Alternative options)

### Error Tracking (Sentry)

1. Sign up at [Sentry](https://sentry.io)
2. Create a new project (Node.js)
3. Get your DSN
4. Add to backend `.env`:
   ```
   SENTRY_DSN=your-sentry-dsn
   ```
5. Install Sentry SDK (already in package.json):
   ```bash
   cd backend
   npm install @sentry/node
   ```
6. Initialize in `server.js`:
   ```javascript
   const Sentry = require("@sentry/node");
   Sentry.init({ dsn: process.env.SENTRY_DSN });
   ```

### Performance Monitoring

**Backend:**
- Use Render's built-in metrics dashboard
- Monitor response times, error rates, and resource usage

**Frontend:**
- Use Vercel Analytics (built-in)
- Implement Google Analytics or similar
- Use Lighthouse CI for performance audits

### Maintenance Plan

**Regular Updates:**
- Weekly: Review and update dependencies
- Monthly: Security patches and updates
- Quarterly: Major version updates

**Database Backups:**
- MongoDB Atlas provides automatic backups on paid tiers
- For free tier: Use MongoDB Atlas manual backup or `mongodump`

**Deployment Procedures:**
1. Test changes in development environment
2. Create pull request to `develop` branch
3. Review and merge (triggers staging deployment)
4. Test staging environment
5. Create pull request to `main` branch
6. Review and merge (triggers production deployment)
7. Monitor health checks and error logs

**Rollback Procedures:**
1. Identify the issue
2. Check error logs and monitoring dashboards
3. If critical, immediately rollback using platform tools
4. Investigate root cause
5. Fix and redeploy

## 📝 Environment Variables Summary

### Backend (.env)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://your-frontend.vercel.app
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret
LOG_LEVEL=info
SENTRY_DSN=your-sentry-dsn (optional)
```

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
REACT_APP_ENV=production
```

## ✅ Verification Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] Health check endpoints working
- [ ] CI/CD pipeline running successfully
- [ ] Uptime monitoring configured
- [ ] Error tracking set up (optional)
- [ ] Custom domains configured (optional)
- [ ] SSL certificates active
- [ ] Documentation updated

## 🆘 Troubleshooting

**Backend won't start:**
- Check environment variables
- Verify MongoDB connection string
- Check Render logs

**Frontend can't connect to backend:**
- Verify CORS settings
- Check `REACT_APP_API_URL` environment variable
- Ensure backend is running

**CI/CD pipeline failing:**
- Check GitHub Actions logs
- Verify secrets are configured correctly
- Ensure tests pass locally

**Database connection issues:**
- Verify MongoDB Atlas network access
- Check connection string format
- Ensure database user has correct permissions

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

