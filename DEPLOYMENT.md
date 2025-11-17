# Deployment Guide

## 🚀 Deployment Steps

### Backend Deployment

#### Option 1: Render (Recommended for Beginners)

1. **Create Account**: Sign up at [render.com](https://render.com)

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**:
   - **Name**: `mern-task-manager-api`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Leave empty (or set to `backend` if using blueprint)

4. **Environment Variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   FRONTEND_URL=https://your-frontend-url.vercel.app
   PORT=10000
   ```

5. **Deploy**: Click "Create Web Service"

6. **Get Backend URL**: Copy the service URL (e.g., `https://mern-task-manager-api.onrender.com`)

#### Option 2: Railway

1. **Create Account**: Sign up at [railway.app](https://railway.app)

2. **New Project**: Click "New Project" → "Deploy from GitHub repo"

3. **Select Repository**: Choose your repository

4. **Configure**:
   - Set root directory to `backend`
   - Railway auto-detects Node.js

5. **Environment Variables**: Add the same variables as Render

6. **Deploy**: Railway auto-deploys on push

#### Option 3: Heroku

1. **Install Heroku CLI**: [heroku.com/cli](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login**: `heroku login`

3. **Create App**: `heroku create your-app-name`

4. **Set Buildpack**: `heroku buildpacks:set heroku/nodejs`

5. **Set Environment Variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_connection_string
   heroku config:set FRONTEND_URL=your_frontend_url
   ```

6. **Deploy**: `git push heroku main`

### Frontend Deployment

#### Option 1: Vercel (Recommended)

1. **Create Account**: Sign up at [vercel.com](https://vercel.com)

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

5. **Deploy**: Click "Deploy"

6. **Get Frontend URL**: Copy the deployment URL

#### Option 2: Netlify

1. **Create Account**: Sign up at [netlify.com](https://netlify.com)

2. **New Site from Git**:
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select repository

3. **Build Settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

4. **Environment Variables**:
   - Go to Site settings → Environment variables
   - Add `VITE_API_URL`

5. **Deploy**: Click "Deploy site"

#### Option 3: GitHub Pages

1. **Update `vite.config.js`**:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

2. **Build**: `npm run build` in frontend directory

3. **Deploy**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (create this branch)
   - Folder: `/frontend/dist`

## 🔄 Update Frontend After Backend Deployment

After deploying backend, update frontend environment variable:

1. Go to your frontend deployment platform (Vercel/Netlify)
2. Update `VITE_API_URL` to your backend URL
3. Redeploy frontend

## ✅ Post-Deployment Checklist

- [ ] Backend health check works: `https://your-backend-url/api/health`
- [ ] Frontend loads without errors
- [ ] Frontend can create tasks
- [ ] Frontend can view tasks
- [ ] Frontend can update tasks
- [ ] Frontend can delete tasks
- [ ] Dashboard shows statistics
- [ ] CORS is working (no CORS errors in browser console)
- [ ] All environment variables are set correctly

## 🔍 Troubleshooting

### Backend Issues

**503 Service Unavailable**:
- Check MongoDB connection string
- Verify environment variables
- Check Render/Railway logs

**CORS Errors**:
- Verify `FRONTEND_URL` matches your frontend URL exactly
- Check backend logs for CORS errors

### Frontend Issues

**API Connection Failed**:
- Verify `VITE_API_URL` is set correctly
- Check backend is running
- Verify CORS settings

**Build Errors**:
- Check Node.js version (should be 18+)
- Verify all dependencies installed
- Check build logs

## 📊 Monitoring

### Health Check
Monitor your backend health:
```bash
curl https://your-backend-url/api/health
```

### Uptime Monitoring
Set up uptime monitoring with:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://pingdom.com)
- [StatusCake](https://www.statuscake.com)

Monitor: `https://your-backend-url/api/health`

## 🔐 Security Checklist

- [ ] MongoDB Atlas IP whitelist configured
- [ ] Environment variables not exposed in code
- [ ] CORS configured for specific origins
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Security headers enabled (Helmet.js)

