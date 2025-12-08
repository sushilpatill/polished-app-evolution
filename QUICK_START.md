# 🚀 Quick Start Guide - Clerk Authentication Setup

## Prerequisites
✅ Node.js installed  
✅ Git initialized (optional but recommended)  
✅ Backend dependencies installed  
✅ Frontend dependencies installed  

## Step 1: Get Your Clerk API Keys

1. Go to **[https://dashboard.clerk.com/](https://dashboard.clerk.com/)**
2. **Sign up** or **Sign in** to your Clerk account
3. Click **"+ Create application"**
4. Name your app (e.g., "JobGeniusAI")
5. Select authentication methods you want:
   - ✅ **Email** (email/password login)
   - ✅ **Google** (OAuth)
   - ✅ **GitHub** (OAuth)
   - ✅ **Phone** (OTP/SMS) - if needed
6. Click **"Create application"**

### Copy Your API Keys

Once your application is created, you'll see your API keys:

```
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_yyyyyyyyyyyyyy
```

## Step 2: Configure Environment Variables

### Frontend Configuration

Open `frontend/.env` and replace with your actual keys:

```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

### Backend Configuration

Open `backend/.env` and replace with your actual keys:

```env
PORT=5000
CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/jobgenius
FRONTEND_URL=http://localhost:8080
NODE_ENV=development
```

> **Note:** The `DATABASE_URL` is for future use. You don't need a database yet.

## Step 3: Start the Application

### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

✅ Backend should start on: **http://localhost:5000**

### Terminal 2 - Start Frontend Dev Server

```bash
cd frontend
npm run dev
```

✅ Frontend should start on: **http://localhost:8080**

## Step 4: Test Your Authentication

1. Open browser to: **http://localhost:8080**
2. Click **"Sign In"** or **"Get Started"**
3. Try signing up with:
   - Email/Password
   - Google OAuth
   - GitHub OAuth
   - Phone/OTP (if enabled)

### Expected Flow:
```
Homepage → Sign Up → Email Verification → Dashboard
              ↓
         (or Sign In) → Dashboard
```

## 🎯 What You Get with Clerk

### ✅ Out-of-the-Box Features:
- **Email/Password Authentication**
- **OAuth (Google, GitHub, Microsoft, etc.)**
- **Phone/SMS OTP Verification**
- **Email Verification**
- **Password Reset**
- **Session Management**
- **Multi-Factor Authentication (MFA)**
- **User Profile Management**
- **Beautiful Pre-built UI Components**

### 🔐 Security Features:
- Secure password hashing
- JWT token management
- Session handling
- Rate limiting
- CSRF protection
- XSS protection

## 📁 Project Structure

```
project-revive/
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # Clerk Provider & Routes
│   │   ├── pages/
│   │   │   ├── SignIn.tsx       # Clerk SignIn Component
│   │   │   ├── SignUp.tsx       # Clerk SignUp Component
│   │   │   └── Dashboard.tsx    # Protected Dashboard
│   │   └── ...
│   ├── .env                     # Frontend environment variables
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── index.ts             # Express server with Clerk
│   │   ├── middleware/
│   │   │   └── auth.ts          # Clerk auth middleware
│   │   └── routes/
│   │       ├── auth.ts          # Auth endpoints
│   │       └── users.ts         # User endpoints
│   ├── .env                     # Backend environment variables
│   └── package.json
│
└── README.md
```

## 🔧 Troubleshooting

### Issue: "Clerk: Missing publishable key"
**Solution:** Make sure you've added `VITE_CLERK_PUBLISHABLE_KEY` to `frontend/.env`

### Issue: "Network Error" when signing in
**Solution:** Ensure backend server is running on port 5000

### Issue: Clerk component not showing
**Solution:** Check browser console for errors. Ensure Clerk SDK is installed:
```bash
cd frontend
npm list @clerk/clerk-react
```

### Issue: Can't sign in with OAuth
**Solution:** In Clerk Dashboard:
1. Go to **"User & Authentication" → "Social Connections"**
2. Enable the OAuth providers you want (Google, GitHub, etc.)
3. Configure OAuth credentials if needed

## 🎨 Customization

### Customize Clerk UI Appearance

The Clerk components already match your app's design in `SignIn.tsx` and `SignUp.tsx`:

```tsx
appearance={{
  elements: {
    card: "glass-card rounded-3xl border-border/50 shadow-xl",
    formButtonPrimary: "bg-primary hover:bg-primary/90",
    // ... more customization
  }
}}
```

### Add More Authentication Methods

In Clerk Dashboard:
1. Go to **"User & Authentication"**
2. Enable additional methods:
   - Phone (SMS OTP)
   - Microsoft
   - Apple
   - Facebook
   - etc.

## 📱 Next Steps

1. **Test Sign Up/Sign In Flow** ✅
2. **Configure OAuth Providers** (optional)
3. **Enable Email Verification** (recommended)
4. **Set up Phone Authentication** (optional)
5. **Add User Profile Management**
6. **Connect to Database** (for storing app data)
7. **Deploy to Production**

## 🌐 Clerk Dashboard Features

- **User Management:** View all registered users
- **Sessions:** Monitor active sessions
- **Analytics:** Track sign-ups, logins, etc.
- **Webhooks:** Listen to user events
- **Emails:** Customize verification emails
- **Branding:** Customize auth UI

## 💡 Useful Clerk Hooks (Frontend)

```tsx
import { useUser, useClerk, useAuth } from "@clerk/clerk-react";

// Get current user
const { user, isLoaded, isSignedIn } = useUser();

// Sign out
const { signOut } = useClerk();

// Get auth token
const { getToken } = useAuth();
```

## 🔗 Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk React SDK](https://clerk.com/docs/references/react/overview)
- [Clerk Node SDK](https://clerk.com/docs/references/nodejs/overview)
- [Clerk Dashboard](https://dashboard.clerk.com/)

---

## ⚡ Quick Command Reference

```bash
# Start Backend
cd backend && npm run dev

# Start Frontend
cd frontend && npm run dev

# Install Dependencies
npm install

# Check for errors
npm run type-check  # (if configured)
```

---

**🎉 You're all set! Your authentication system is production-ready.**

Need help? Check the [Clerk Documentation](https://clerk.com/docs) or ask in their [Discord Community](https://clerk.com/discord).
