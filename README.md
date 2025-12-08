# 🚀 JobGenius AI

AI-Powered Career Coaching Platform - Full Stack Application with Clerk Authentication

## ⚡ Quick Start

**New to this project?** Follow the [QUICK_START.md](QUICK_START.md) guide!

## 📁 Project Structure

```
project-revive/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/  # UI components (shadcn/ui)
│   │   ├── pages/       # Page components
│   │   │   ├── Index.tsx      # Landing page
│   │   │   ├── SignIn.tsx     # Clerk SignIn
│   │   │   ├── SignUp.tsx     # Clerk SignUp
│   │   │   └── Dashboard.tsx  # Protected dashboard
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── assets/      # Images, fonts, etc.
│   ├── public/
│   ├── .env             # Environment variables (add your Clerk keys here!)
│   └── package.json
│
├── backend/           # Express + TypeScript API
│   ├── src/
│   │   ├── routes/      # API routes (auth, users)
│   │   ├── middleware/  # Clerk auth middleware
│   │   └── index.ts     # Express server
│   ├── .env             # Environment variables (add your Clerk keys here!)
│   └── package.json
│
├── QUICK_START.md     # 🚀 Setup guide (start here!)
├── CLERK_SETUP_COMPLETE.md  # ✅ What's been done
└── README.md          # This file
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: Clerk (to be integrated)
- **Security**: Helmet, CORS
- **Logging**: Morgan

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd project-revive
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

4. **Setup Environment Variables**

Frontend (.env in frontend/):
```env
# Add frontend env variables here
VITE_API_URL=http://localhost:5000
```

Backend (.env in backend/):
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

### Running the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:8080

#### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm run build
npm start
```

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

### Health Check
- `GET /` - API information
- `GET /api/health` - Health status

### Authentication (Coming Soon)
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login  
- `POST /api/auth/logout` - User logout

### Users (Coming Soon)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `DELETE /api/users/:id` - Delete account

## 📦 Key Features

✅ Modern, responsive UI/UX
✅ Authentication pages (Sign In, Sign Up)
✅ Protected dashboard
✅ RESTful API structure
✅ TypeScript throughout
✅ Hot module replacement
✅ Production-ready build setup

## 🔒 Security

- Helmet.js for HTTP headers security
- CORS configuration
- Environment variables for sensitive data
- TypeScript for type safety

## 📄 License

This project is private and confidential.

## 👥 Contributors

- Development Team

---

**Made with ❤️ by JobGenius AI Team**

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
