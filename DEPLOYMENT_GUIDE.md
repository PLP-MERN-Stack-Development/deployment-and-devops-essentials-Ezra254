# 🚀 Deployment Guide: Vercel (Frontend) + Render (Backend)

This guide will walk you through deploying your MERN Task Manager application with:
- **Frontend**: Vercel
- **Backend**: Render

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ GitHub account with your code pushed
- ✅ MongoDB Atlas account and cluster set up
- ✅ Vercel account (free tier available)
- ✅ Render account (free tier available)

---

## 🔧 Step 1: Set Up MongoDB Atlas

1. **Create/Login to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Create a Free Cluster** (if you haven't already):
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select a region close to you
   - Click "Create"

3. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Authentication: Password
   - Username: `taskmanager` (or your choice)
   - Password: Generate a secure password (SAVE THIS!)
   - Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Addresses**:
   - Go to "Network Access" → "Add IP Address"
   - For Render: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `taskmanager`
   - **Save this connection string** - you'll need it for Render

**Example connection string:**
```
mongodb+srv://taskmanager:YourPassword123@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

---

## 🚀 Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended for easy deployment)

### 2.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account if not already connected
3. Select your repository: `deployment-and-devops-essentials-Ezra254`

### 2.3 Configure Backend Service
Fill in the following settings:

**Basic Settings:**
- **Name**: `mern-task-manager-api` (or your choice)
- **Region**: Choose closest to you
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free` (or choose a paid plan)

**Environment Variables:**
Click "Add Environment Variable" and add:

```
NODE_ENV = production
```

```
MONGODB_URI = mongodb+srv://taskmanager:YourPassword@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```
*(Replace with your actual connection string)*

```
FRONTEND_URL = https://your-frontend-app.vercel.app
```
*(We'll update this after deploying frontend - use placeholder for now)*

```
PORT = 10000
```
*(Render sets this automatically, but good to have)*

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Render will start building and deploying your backend
3. Wait for deployment to complete (usually 2-5 minutes)
4. Once deployed, you'll get a URL like: `https://mern-task-manager-api.onrender.com`

### 2.5 Test Backend
1. Visit: `https://your-backend-url.onrender.com/api/health`
2. You should see:
   ```json
   {
     "status": "OK",
     "timestamp": "...",
     "uptime": ...,
     "environment": "production"
   }
   ```

**✅ Backend is now deployed!**

**Important**: Copy your backend URL - you'll need it for the frontend deployment.

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended)

### 3.2 Import Project
1. Click **"Add New"** → **"Project"**
2. Import your GitHub repository: `deployment-and-devops-essentials-Ezra254`
3. Vercel will auto-detect it's a Vite project

### 3.3 Configure Frontend
Vercel should auto-detect settings, but verify:

**Framework Preset:**
- **Framework Preset**: `Vite` (should be auto-detected)

**Root Directory:**
- Click "Edit" next to Root Directory
- Set to: `frontend`

**Build and Output Settings:**
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

**Environment Variables:**
Click "Add" and add:

```
VITE_API_URL = https://your-backend-url.onrender.com
```
*(Replace with your actual Render backend URL from Step 2.4)*

### 3.4 Deploy
1. Click **"Deploy"**
2. Vercel will build and deploy your frontend
3. Wait for deployment (usually 1-2 minutes)
4. Once deployed, you'll get a URL like: `https://mern-task-manager.vercel.app`

**✅ Frontend is now deployed!**

### 3.5 Update Backend CORS
Now that you have your frontend URL, update the backend:

1. Go back to Render dashboard
2. Click on your backend service
3. Go to "Environment" tab
4. Update `FRONTEND_URL` to your Vercel frontend URL:
   ```
   FRONTEND_URL = https://your-frontend-app.vercel.app
   ```
5. Click "Save Changes"
6. Render will automatically redeploy with the new CORS settings

---

## ✅ Step 4: Verify Deployment

### Test Your Application

1. **Frontend**: Visit your Vercel URL
   - Should load the Task Manager interface
   - Dashboard should display

2. **Create a Task**:
   - Click "New Task"
   - Fill in task details
   - Submit
   - Should see success message

3. **View Tasks**:
   - Go to "Tasks" page
   - Your created task should appear

4. **Test All Features**:
   - ✅ Create task
   - ✅ View tasks
   - ✅ Edit task
   - ✅ Delete task
   - ✅ Filter by status/priority
   - ✅ View dashboard statistics

### Check Backend Health
Visit: `https://your-backend-url.onrender.com/api/health`

Should return:
```json
{
  "status": "OK",
  "timestamp": "2024-...",
  "uptime": 12345,
  "environment": "production"
}
```

---

## 🔄 Step 5: Set Up Continuous Deployment

Both platforms support automatic deployments from GitHub:

### Render (Backend)
- ✅ Already configured - pushes to `main` branch auto-deploy
- You can see deployment history in Render dashboard

### Vercel (Frontend)
- ✅ Already configured - pushes to `main` branch auto-deploy
- You can see deployment history in Vercel dashboard

**To deploy updates:**
1. Make changes to your code
2. Commit and push to GitHub
3. Both platforms will automatically rebuild and redeploy

---

## 🔧 Troubleshooting

### Backend Issues

**503 Service Unavailable:**
- Check MongoDB connection string is correct
- Verify environment variables are set
- Check Render logs for errors

**MongoDB Connection Failed:**
- Verify IP whitelist includes Render's IPs (0.0.0.0/0)
- Check username/password in connection string
- Verify cluster is running in MongoDB Atlas

**CORS Errors:**
- Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
- Check backend logs for CORS errors
- Ensure no trailing slashes in URLs

### Frontend Issues

**API Connection Failed:**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check it matches your Render backend URL
- Ensure backend is running and accessible
- Check browser console for errors

**Build Errors:**
- Check Vercel build logs
- Verify Node.js version (should be 18+)
- Ensure all dependencies are in package.json

**Blank Page:**
- Check browser console for errors
- Verify API URL is correct
- Check network tab for failed requests

### General Issues

**Environment Variables Not Working:**
- In Vercel: Environment variables must start with `VITE_` to be accessible in frontend
- In Render: Restart service after adding environment variables
- Clear browser cache and hard refresh

**Slow First Load (Render Free Tier):**
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- Consider upgrading to paid plan for always-on service

---

## 📊 Monitoring

### Render Monitoring
- View logs in Render dashboard
- Check service health status
- Monitor resource usage

### Vercel Monitoring
- View deployment logs
- Check analytics (if enabled)
- Monitor build times

### Application Monitoring
- Health check: `https://your-backend-url.onrender.com/api/health`
- Set up uptime monitoring with:
  - [UptimeRobot](https://uptimerobot.com) (free)
  - Monitor your backend health endpoint

---

## 🔐 Security Checklist

- [x] MongoDB Atlas IP whitelist configured
- [x] Strong database passwords set
- [x] Environment variables not exposed in code
- [x] CORS configured for specific frontend URL
- [x] HTTPS enabled (automatic on both platforms)
- [x] Security headers enabled (Helmet.js in backend)

---

## 📝 Important Notes

### Render Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds to wake up
- Limited to 750 hours/month
- For production, consider upgrading to paid plan

### Vercel Free Tier
- Unlimited deployments
- Fast global CDN
- Automatic HTTPS
- Great for production use

### MongoDB Atlas Free Tier
- 512MB storage
- Shared cluster
- Perfect for development and small projects

---

## 🎉 Success!

Your MERN Task Manager is now live on:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-api.onrender.com
- **Database**: MongoDB Atlas (cloud)

### Next Steps
1. Test all functionality
2. Share your deployed URLs
3. Monitor application health
4. Set up uptime monitoring
5. Consider upgrading plans for production use

---

## 📞 Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/

Happy deploying! 🚀

