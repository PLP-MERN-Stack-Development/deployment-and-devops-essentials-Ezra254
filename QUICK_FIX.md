# 🚨 Quick Fix: "Route not found" Error

## Immediate Steps to Fix

### Step 1: Check Vercel Environment Variable

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Find `VITE_API_URL`
3. **Current value should be:** `https://your-backend-url.onrender.com` (no `/api`, no trailing slash)
4. If it's different, update it to match the format above
5. **Save** and **Redeploy** (go to Deployments → Latest → Redeploy)

### Step 2: Check Render CORS Settings

1. Go to **Render Dashboard** → Your Backend Service → **Environment** tab
2. Find `FRONTEND_URL`
3. **Should be:** `https://your-frontend-app.vercel.app` (exact match, no trailing slash)
4. If different, update it
5. **Save** (auto-redeploys)

### Step 3: Verify Backend is Running

1. Open: `https://your-backend-url.onrender.com/api/health`
2. Should see JSON response with `"status": "OK"`
3. If not, wait 30 seconds (Render free tier spins down after 15 min)

### Step 4: Test Backend Directly

Open browser console on your deployed frontend and run:

```javascript
// Check API URL
console.log('API URL:', import.meta.env.VITE_API_URL)

// Test health endpoint
fetch('https://your-backend-url.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### Step 5: Check Browser Console

1. Open your deployed frontend
2. Open Browser DevTools (F12)
3. Go to **Console** tab
4. Try creating a task
5. Look for error messages - they'll tell you exactly what's wrong

### Step 6: Check Network Tab

1. Browser DevTools → **Network** tab
2. Try creating a task
3. Look for the POST request to `/api/tasks`
4. Check:
   - **Request URL**: Should be `https://your-backend-url.onrender.com/api/tasks`
   - **Status**: Should be 200 or 201 (not 404)
   - **Response**: Check what the server returned

---

## Common Issues & Solutions

### Issue: API URL is wrong

**Symptom:** Network tab shows request going to wrong URL

**Fix:**
- Vercel → Environment Variables → `VITE_API_URL`
- Set to: `https://your-backend-url.onrender.com` (no `/api`)
- Redeploy

### Issue: CORS Error

**Symptom:** Browser console shows CORS error

**Fix:**
- Render → Environment → `FRONTEND_URL`
- Set to exact Vercel URL: `https://your-frontend.vercel.app`
- No trailing slash!
- Save and wait for redeploy

### Issue: 404 Not Found

**Symptom:** Network tab shows 404 status

**Possible causes:**
1. Backend not running (wait 30 seconds for Render to wake up)
2. Wrong URL path (should be `/api/tasks`, not `/tasks`)
3. Backend route not registered

**Fix:**
- Test backend health endpoint first
- Verify the request URL in Network tab
- Check Render logs for errors

### Issue: Backend Spun Down (Render Free Tier)

**Symptom:** First request takes 30+ seconds, then works

**Fix:**
- This is normal for Render free tier
- Wait for backend to wake up
- Consider upgrading to paid plan for always-on service

---

## After Making Changes

1. **Redeploy Frontend** (Vercel):
   - Settings → Environment Variables → Save
   - Deployments → Latest → Redeploy

2. **Backend Auto-Redeploys** (Render):
   - Environment → Save
   - Automatically redeploys

3. **Wait 2-3 minutes** for deployments to complete

4. **Test again** - clear browser cache if needed (Ctrl+Shift+R)

---

## Still Not Working?

1. **Check Render Logs:**
   - Render Dashboard → Your Service → Logs
   - Look for errors when creating tasks
   - Check MongoDB connection status

2. **Check Vercel Logs:**
   - Vercel Dashboard → Deployments → Latest → View Function Logs
   - Look for build errors

3. **Test Backend Manually:**
   ```bash
   curl -X POST https://your-backend-url.onrender.com/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"Test","status":"pending","priority":"medium"}'
   ```

4. **Verify MongoDB:**
   - MongoDB Atlas → Browse Collections
   - Check if tasks collection exists
   - Verify connection string in Render

---

## Quick Checklist

- [ ] `VITE_API_URL` in Vercel = `https://backend.onrender.com` (no `/api`)
- [ ] `FRONTEND_URL` in Render = `https://frontend.vercel.app` (exact match)
- [ ] Backend health check works: `/api/health`
- [ ] Frontend redeployed after changing env vars
- [ ] Browser cache cleared
- [ ] Checked browser console for errors
- [ ] Checked Network tab for request details

---

**Most Common Fix:** Update `VITE_API_URL` in Vercel to your backend URL (without `/api`) and redeploy!

