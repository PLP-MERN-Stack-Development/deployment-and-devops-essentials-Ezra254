# 🔧 Network Error Fix Guide

## Immediate Steps to Diagnose

### Step 1: Check Browser Console

1. Open your deployed frontend
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Look for these messages when the page loads:
   - `🔧 API Configuration:` - Shows your API URL
   - `🌐 API Request:` - Shows each API call
   - `❌ API Network Error:` - Shows detailed error info

### Step 2: Check Network Tab

1. DevTools → **Network** tab
2. Try creating a task
3. Look for the POST request to `/api/tasks`
4. Click on it and check:
   - **Status**: What HTTP status code?
   - **Request URL**: Is it correct?
   - **Response**: What does the server return?

### Step 3: Test API Connection

In browser console, run:
```javascript
testAPIConnection()
```

This will test:
- ✅ Health endpoint
- ✅ Get tasks
- ✅ Create task

---

## Common Issues & Quick Fixes

### Issue 1: "Network Error: Could not reach the server"

**Cause:** Backend is not accessible

**Solutions:**

1. **Check if backend is running:**
   - Open: `https://your-backend-url.onrender.com/api/health`
   - Should return JSON with `"status": "OK"`
   - If not, backend is down or URL is wrong

2. **Render Free Tier Spin-Down:**
   - Render free tier spins down after 15 min inactivity
   - First request takes ~30 seconds to wake up
   - **Solution:** Wait 30 seconds and try again

3. **Wrong Backend URL:**
   - Check console: `🔧 API Configuration`
   - Verify `VITE_API_URL` in Vercel matches your Render URL
   - Should be: `https://your-backend.onrender.com` (no `/api`)

---

### Issue 2: CORS Error

**Symptom:** Console shows "CORS policy" or "blocked by CORS"

**Fix:**

1. **Render Dashboard** → Backend Service → **Environment**
2. Check `FRONTEND_URL`:
   - Should be: `https://your-frontend.vercel.app`
   - Must match **exactly** (no trailing slash, correct protocol)
3. **Save** and wait for redeploy

---

### Issue 3: 404 Not Found

**Symptom:** Network tab shows 404 status

**Check:**
1. Request URL in Network tab
2. Should be: `https://backend.onrender.com/api/tasks`
3. If URL is wrong, fix `VITE_API_URL` in Vercel

---

### Issue 4: 500 Server Error

**Symptom:** Network tab shows 500 status

**Check:**
1. **Render Dashboard** → Logs
2. Look for error messages
3. Common causes:
   - MongoDB connection failed
   - Environment variables missing
   - Code errors

---

## Quick Diagnostic Checklist

Run these in browser console on your deployed site:

```javascript
// 1. Check API URL configuration
console.log('API URL:', import.meta.env.VITE_API_URL)

// 2. Test backend health
fetch('https://your-backend-url.onrender.com/api/health')
  .then(r => r.json())
  .then(data => {
    console.log('✅ Backend is running:', data)
  })
  .catch(err => {
    console.error('❌ Backend error:', err)
    console.log('Backend might be spun down. Wait 30 seconds and try again.')
  })

// 3. Test creating a task directly
fetch('https://your-backend-url.onrender.com/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Direct Test Task',
    status: 'pending',
    priority: 'medium'
  })
})
  .then(r => r.json())
  .then(data => {
    console.log('✅ Task created:', data)
  })
  .catch(err => {
    console.error('❌ Create failed:', err)
  })
```

---

## Step-by-Step Fix

### 1. Verify Backend is Running

```bash
# Open in browser or use curl
https://your-backend-url.onrender.com/api/health
```

**Expected:** JSON with `"status": "OK"`

**If not working:**
- Wait 30 seconds (Render spin-up)
- Check Render dashboard for errors
- Verify backend service is deployed

### 2. Verify Environment Variables

**Vercel:**
- `VITE_API_URL` = `https://your-backend-url.onrender.com` (no `/api`)

**Render:**
- `FRONTEND_URL` = `https://your-frontend-url.vercel.app` (exact match)
- `MONGODB_URI` = Your MongoDB connection string
- `NODE_ENV` = `production`

### 3. Test CORS

Open browser console on frontend and run:
```javascript
fetch('https://your-backend-url.onrender.com/api/health', {
  method: 'GET',
  headers: {
    'Origin': window.location.origin
  }
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

If CORS error, update `FRONTEND_URL` in Render.

### 4. Redeploy

**After changing environment variables:**

1. **Vercel:** Settings → Environment Variables → Save → Redeploy
2. **Render:** Environment → Save (auto-redeploys)

3. **Wait 2-3 minutes** for deployments

4. **Clear browser cache:** Ctrl+Shift+R

---

## Still Not Working?

### Check Render Logs

1. Render Dashboard → Your Backend Service → **Logs**
2. Look for:
   - `✅ MongoDB Connected` - Database connected
   - `📥 POST /api/tasks` - Request received
   - Error messages

### Check Vercel Logs

1. Vercel Dashboard → Deployments → Latest
2. Check build logs for errors
3. Check function logs for runtime errors

### Test Backend Manually

```bash
# Test health
curl https://your-backend-url.onrender.com/api/health

# Test create task
curl -X POST https://your-backend-url.onrender.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","status":"pending","priority":"medium"}'
```

---

## Most Common Fix

**90% of network errors are caused by:**

1. **Wrong `VITE_API_URL` in Vercel**
   - Should be: `https://backend.onrender.com` (no `/api`, no trailing slash)
   - Fix: Vercel → Settings → Environment Variables → Update → Redeploy

2. **Wrong `FRONTEND_URL` in Render**
   - Should match Vercel URL exactly
   - Fix: Render → Environment → Update → Save

3. **Backend spun down (Render free tier)**
   - Wait 30 seconds for first request
   - Or upgrade to paid plan

---

## Need More Help?

1. Check browser console for detailed error messages
2. Check Network tab for request/response details
3. Check Render logs for backend errors
4. Run `testAPIConnection()` in browser console
5. Verify all environment variables are set correctly

