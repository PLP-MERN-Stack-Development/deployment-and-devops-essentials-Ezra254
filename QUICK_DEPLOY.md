# ⚡ Quick Deployment Checklist

## Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] Database user created with password
- [ ] IP whitelist configured (0.0.0.0/0 for development)
- [ ] MongoDB connection string ready
- [ ] GitHub repository pushed with all code
- [ ] Vercel account created
- [ ] Render account created

---

## 🚀 Deploy Backend to Render (5 minutes)

1. **Go to Render**: https://render.com
2. **New Web Service** → Connect GitHub → Select repo
3. **Configure**:
   - Name: `mern-task-manager-api`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
4. **Environment Variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=https://placeholder.vercel.app (update after frontend deploy)
   PORT=10000
   ```
5. **Deploy** → Wait 2-5 minutes
6. **Copy Backend URL**: `https://your-api.onrender.com`

---

## 🎨 Deploy Frontend to Vercel (3 minutes)

1. **Go to Vercel**: https://vercel.com
2. **New Project** → Import GitHub repo
3. **Configure**:
   - Root Directory: `frontend`
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build` (auto)
   - Output Directory: `dist` (auto)
4. **Environment Variable**:
   ```
   VITE_API_URL=https://your-api.onrender.com
   ```
5. **Deploy** → Wait 1-2 minutes
6. **Copy Frontend URL**: `https://your-app.vercel.app`

---

## 🔄 Update Backend CORS

1. Go to Render dashboard
2. Your backend service → Environment tab
3. Update `FRONTEND_URL` to your Vercel URL
4. Save → Auto-redeploys

---

## ✅ Test

1. Visit frontend URL
2. Create a task
3. Check it appears
4. Test all CRUD operations

**Done! 🎉**

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

