# 🔧 Troubleshooting Guide

## Common Deployment Issues

### Issue: "Route not found" when creating tasks

**Symptoms:**
- Frontend loads correctly
- Can view tasks (sometimes)
- Creating a new task shows "Route not found" error
- Task is not saved to database

**Causes & Solutions:**

#### 1. Incorrect VITE_API_URL Configuration

**Problem:** The `VITE_API_URL` in Vercel might be missing `/api` or have incorrect format.

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Check `VITE_API_URL` value
3. It should be: `https://your-backend-url.onrender.com` (without `/api` - the code adds it automatically)
4. Or: `https://your-backend-url.onrender.com/api` (with `/api`)
5. After updating, redeploy the frontend

**Correct Format Examples:**
```
✅ https://mern-task-manager-api.onrender.com
✅ https://mern-task-manager-api.onrender.com/api
❌ https://mern-task-manager-api.onrender.com/
❌ http://mern-task-manager-api.onrender.com (missing https)
```

#### 2. Backend Not Running

**Problem:** Render free tier services spin down after 15 minutes of inactivity.

**Solution:**
- First request after spin-down takes ~30 seconds
- Wait for the backend to wake up
- Check backend health: `https://your-backend-url.onrender.com/api/health`
- Consider upgrading to paid plan for always-on service

#### 3. CORS Issues

**Problem:** Browser console shows CORS errors.

**Solution:**
1. Go to Render Dashboard → Your Backend Service → Environment
2. Check `FRONTEND_URL` matches your Vercel URL exactly
3. Should be: `https://your-frontend-app.vercel.app` (no trailing slash)
4. Save and wait for redeploy

#### 4. Backend Route Not Found

**Problem:** Backend returns 404 for POST requests.

**Check:**
1. Test backend directly: `POST https://your-backend-url.onrender.com/api/tasks`
2. Use Postman or curl:
   ```bash
   curl -X POST https://your-backend-url.onrender.com/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"Test Task","status":"pending","priority":"medium"}'
   ```

**Solution:**
- Verify backend routes are correct
- Check backend logs in Render dashboard
- Ensure MongoDB connection is working

---

### Issue: Frontend Can't Connect to Backend

**Symptoms:**
- Network errors in browser console
- "Failed to fetch" errors
- Tasks don't load

**Solutions:**

1. **Check API URL:**
   - Open browser DevTools → Network tab
   - Look at failed requests
   - Verify the URL is correct

2. **Check Environment Variable:**
   ```javascript
   // In browser console on your deployed site:
   console.log(import.meta.env.VITE_API_URL)
   ```
   - Should show your backend URL
   - If undefined, environment variable not set correctly

3. **Rebuild Frontend:**
   - After changing `VITE_API_URL`, you must rebuild
   - Vercel should auto-rebuild, but you can trigger manually
   - Go to Vercel → Deployments → Redeploy

---

### Issue: MongoDB Connection Failed

**Symptoms:**
- Backend logs show MongoDB connection errors
- Tasks can't be saved
- Health check works but tasks don't

**Solutions:**

1. **Check MongoDB Atlas:**
   - Verify cluster is running
   - Check database user exists
   - Verify password is correct

2. **Check IP Whitelist:**
   - MongoDB Atlas → Network Access
   - Ensure Render IPs are whitelisted
   - For development: Use `0.0.0.0/0` (Allow from anywhere)

3. **Check Connection String:**
   - Render → Environment Variables → `MONGODB_URI`
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
   - Replace `<password>` with actual password
   - URL encode special characters in password

---

### Issue: Tasks Created But Not Showing

**Symptoms:**
- No error when creating task
- Task doesn't appear in list
- Dashboard shows 0 tasks

**Solutions:**

1. **Check Browser Console:**
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **Check Backend Logs:**
   - Render Dashboard → Logs
   - Look for errors when creating tasks

3. **Verify Database:**
   - Check MongoDB Atlas → Browse Collections
   - Verify tasks are being saved
   - Check collection name matches

---

## Debugging Steps

### 1. Test Backend Health
```bash
curl https://your-backend-url.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "...",
  "uptime": 123,
  "environment": "production"
}
```

### 2. Test Create Task Endpoint
```bash
curl -X POST https://your-backend-url.onrender.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "Testing",
    "status": "pending",
    "priority": "medium"
  }'
```

### 3. Test Get Tasks
```bash
curl https://your-backend-url.onrender.com/api/tasks
```

### 4. Check Frontend API Configuration

Open browser console on deployed site:
```javascript
// Check if API URL is set
console.log('API URL:', import.meta.env.VITE_API_URL)

// Test API call
fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/health`)
  .then(r => r.json())
  .then(console.log)
```

---

## Quick Fixes

### Fix API URL in Vercel

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Edit `VITE_API_URL`
3. Set to: `https://your-backend-url.onrender.com` (no trailing slash, no /api)
4. Save
5. Go to Deployments → Latest → Redeploy

### Fix CORS in Render

1. Render Dashboard → Backend Service → Environment
2. Edit `FRONTEND_URL`
3. Set to: `https://your-frontend-app.vercel.app` (exact match, no trailing slash)
4. Save (auto-redeploys)

### Verify MongoDB Connection

1. Render Dashboard → Backend Service → Logs
2. Look for: `✅ MongoDB Connected: cluster0.xxxxx.mongodb.net`
3. If you see connection errors, check `MONGODB_URI` environment variable

---

## Still Having Issues?

1. **Check All Environment Variables:**
   - Vercel: `VITE_API_URL`
   - Render: `MONGODB_URI`, `FRONTEND_URL`, `NODE_ENV`, `PORT`

2. **Check Logs:**
   - Vercel: Deployment logs
   - Render: Service logs
   - Browser: Console and Network tabs

3. **Test Locally:**
   - Run backend: `cd backend && npm run dev`
   - Run frontend: `cd frontend && npm run dev`
   - Test if it works locally first

4. **Verify URLs:**
   - Backend: `https://your-backend.onrender.com/api/health`
   - Frontend: `https://your-frontend.vercel.app`

---

## Common Mistakes

❌ **Wrong:** `VITE_API_URL=https://backend.onrender.com/api/` (trailing slash)
✅ **Correct:** `VITE_API_URL=https://backend.onrender.com`

❌ **Wrong:** `FRONTEND_URL=https://frontend.vercel.app/` (trailing slash)
✅ **Correct:** `FRONTEND_URL=https://frontend.vercel.app`

❌ **Wrong:** `MONGODB_URI=mongodb://localhost:27017` (local DB in production)
✅ **Correct:** `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db`

❌ **Wrong:** Not rebuilding after changing environment variables
✅ **Correct:** Always redeploy after changing env vars

