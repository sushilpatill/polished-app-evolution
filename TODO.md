# 🎯 TO-DO: Complete Your Clerk Setup

## ⏱️ This will take about 5 minutes

### Step 1: Get Clerk API Keys (2 minutes)

1. **Open Clerk Dashboard:**  
   👉 [https://dashboard.clerk.com/](https://dashboard.clerk.com/)

2. **Sign Up or Sign In**

3. **Create Application:**
   - Click **"+ Create application"**
   - Name: `JobGeniusAI` (or any name you like)
   - Select authentication methods:
     - ✅ Email
     - ✅ Google
     - ✅ GitHub
     - ✅ Phone (optional)
   - Click **"Create application"**

4. **Copy Your Keys:**
   
   You'll see something like this:
   ```
   CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
   CLERK_SECRET_KEY=sk_test_yyyyyyyyyyyyyyyyyyy
   ```
   
   📋 Copy both keys!

---

### Step 2: Add Keys to Frontend (1 minute)

Open `frontend/.env` and replace:

```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_paste_your_actual_key_here
```

**Example:**
```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_abc123def456ghi789jkl012mno345
```

---

### Step 3: Add Keys to Backend (1 minute)

Open `backend/.env` and replace:

```env
PORT=5000
CLERK_PUBLISHABLE_KEY=pk_test_paste_your_actual_key_here
CLERK_SECRET_KEY=sk_test_paste_your_actual_secret_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/jobgenius
FRONTEND_URL=http://localhost:8080
NODE_ENV=development
```

**Example:**
```env
PORT=5000
CLERK_PUBLISHABLE_KEY=pk_test_abc123def456ghi789jkl012mno345
CLERK_SECRET_KEY=sk_test_xyz789uvw456rst123opq890lmn567
DATABASE_URL=postgresql://user:password@localhost:5432/jobgenius
FRONTEND_URL=http://localhost:8080
NODE_ENV=development
```

> **Note:** DATABASE_URL is for future use - you don't need a database yet!

---

### Step 4: Start Backend Server (30 seconds)

Open **Terminal 1** and run:

```bash
cd backend
npm run dev
```

✅ You should see:
```
🚀 Server running on http://localhost:5000
🔐 Authentication: Clerk
```

---

### Step 5: Start Frontend Server (30 seconds)

Open **Terminal 2** and run:

```bash
cd frontend
npm run dev
```

✅ You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
```

---

### Step 6: Test Authentication! 🎉

1. **Open Browser:**  
   👉 http://localhost:8080

2. **Click "Get Started" or "Sign In"**

3. **Sign Up:**
   - Try email/password
   - Or click "Continue with Google"
   - Or click "Continue with GitHub"

4. **Check Dashboard:**
   - You should be redirected to `/dashboard`
   - You should see: "Welcome back, [Your Name]!"

5. **Try Signing Out:**
   - Click "Logout" button
   - You should be redirected back to home page

---

## ✅ Success Checklist

- [ ] Created Clerk account
- [ ] Created Clerk application
- [ ] Copied Clerk keys
- [ ] Updated `frontend/.env` with publishable key
- [ ] Updated `backend/.env` with both keys
- [ ] Started backend server (Terminal 1)
- [ ] Started frontend server (Terminal 2)
- [ ] Opened http://localhost:8080 in browser
- [ ] Successfully signed up
- [ ] Saw dashboard with my name
- [ ] Successfully signed out

---

## 🎊 Congratulations!

**You now have a fully functional authentication system with:**
- ✅ Email/Password login
- ✅ OAuth (Google, GitHub)
- ✅ User sessions
- ✅ Protected routes
- ✅ Real user data
- ✅ Logout functionality

---

## 🆘 Troubleshooting

### "Clerk: Missing publishable key"
**Fix:** Double-check `frontend/.env` has `VITE_CLERK_PUBLISHABLE_KEY=pk_test_...`

### Clerk component not showing
**Fix:** 
1. Make sure key starts with `pk_test_` or `pk_live_`
2. Restart frontend server: `Ctrl+C` then `npm run dev`

### "Cannot connect to backend"
**Fix:** Make sure backend is running on port 5000

### OAuth not working
**Fix:** In Clerk Dashboard:
1. Go to "User & Authentication" → "Social Connections"
2. Enable Google/GitHub
3. Some providers need OAuth app setup

---

## 📚 What to Read Next

- [CLERK_SETUP_COMPLETE.md](CLERK_SETUP_COMPLETE.md) - See what was implemented
- [QUICK_START.md](QUICK_START.md) - Detailed setup guide
- [Clerk Documentation](https://clerk.com/docs) - Learn more about Clerk

---

## 🚀 Next Features to Add

Once authentication is working, you can:
1. Add user profile page
2. Connect to a real database
3. Add more protected routes
4. Build the AI coaching features
5. Add payment integration
6. Deploy to production

---

**Need help? Check the troubleshooting section above or visit [Clerk Discord](https://clerk.com/discord)!**
