# MongoDB Setup Guide

## Quick Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create Free Cluster**:
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select a cloud provider and region
   - Click "Create"

3. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Username: `taskmanager` (or your choice)
   - Password: Generate a secure password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**:
   - Go to "Network Access" → "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IPs
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `taskmanager` (or your choice)

6. **Update .env file**:
   ```env
   MONGODB_URI=mongodb+srv://taskmanager:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

1. **Install MongoDB Community Edition**:
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Or use MongoDB via Docker:
     ```bash
     docker run -d -p 27017:27017 --name mongodb mongo:latest
     ```

2. **Update .env file**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   ```

3. **Start MongoDB**:
   - Windows: MongoDB should start as a service automatically
   - Or run: `mongod` in a terminal

## Connection String Format

### MongoDB Atlas:
```
mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### Local MongoDB:
```
mongodb://localhost:27017/dbname
```

## Troubleshooting

### Error: "MONGODB_URI is not defined"
- **Solution**: Create a `.env` file in the `backend` directory
- Copy from `.env.example` and fill in your connection string

### Error: "Authentication failed"
- **Solution**: Check username and password in connection string
- Verify database user exists in MongoDB Atlas

### Error: "getaddrinfo ENOTFOUND" or "timeout"
- **Solution**: Check your IP is whitelisted in MongoDB Atlas
- Verify cluster is running and accessible
- Check internet connection

### Error: "Connection timeout"
- **Solution**: 
  - Check firewall settings
  - Verify MongoDB Atlas cluster is active
  - Check network connectivity

## Testing Connection

After setting up, test the connection:

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📊 Database: taskmanager
Server running on port 5000 in development mode
```

## Security Notes

- **Never commit `.env` file to Git** (it's in `.gitignore`)
- Use strong passwords for database users
- For production, whitelist specific IPs instead of 0.0.0.0/0
- Rotate passwords regularly

