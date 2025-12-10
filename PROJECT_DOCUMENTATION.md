# JobGeniusAI - Complete Project Documentation

## 🎯 Project Overview

**JobGeniusAI** is an AI-powered career coaching platform that helps job seekers with resume optimization, interview preparation, job matching, and career insights.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM v6
- **Authentication**: Clerk (@clerk/clerk-react)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: CSS animations + Tailwind Animate

### Backend (Optional - Express.js)
- Express.js with TypeScript
- Prisma ORM
- PostgreSQL database
- Cloudinary for file storage
- Google Gemini AI for resume analysis

---

## 🎨 Design System

### Color Palette (HSL Format)
```css
/* Dark Theme - Primary Colors */
--background: 222 47% 5%;        /* Deep dark blue-black */
--foreground: 210 40% 98%;       /* Almost white text */
--primary: 173 80% 50%;          /* Teal/Cyan accent */
--primary-foreground: 222 47% 5%;

/* Card & Surface Colors */
--card: 222 47% 8%;
--muted: 222 30% 12%;
--muted-foreground: 215 20% 55%;

/* Border & Input */
--border: 222 30% 18%;
--input: 222 30% 18%;
--ring: 173 80% 50%;

/* Destructive */
--destructive: 0 84% 60%;
```

### Typography
- **Display Font**: Sora (headings)
- **Body Font**: Inter (paragraphs, UI)
- Import: `https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap`

### Design Effects
1. **Gradient Text**: Teal to cyan gradient for accent text
2. **Glass Cards**: Glassmorphism with blur and transparency
3. **Glow Effects**: Subtle teal glow on hover states
4. **Grid Pattern**: Subtle background grid overlay
5. **Radial Gradients**: Subtle background lighting effects

### Custom CSS Classes
```css
.gradient-text       /* Teal-cyan gradient text */
.glass-card          /* Glassmorphism card effect */
.glow-effect         /* Hover glow animation */
.hero-glow           /* Large radial glow for hero sections */
.fade-in-up          /* Fade in with upward motion */
.stagger-1/2/3/4     /* Animation delay utilities */
```

---

## 📄 Page Structure

### 1. Landing Page (`/`)
**Components:**
- **Navbar**: Fixed glass-effect nav with logo, links (Features, How It Works, Testimonials, FAQ), Sign In, Get Started buttons
- **HeroSection**: 
  - Badge: "AI-Powered Career Coaching - New"
  - H1: "Your AI Career Coach for Professional Success"
  - Subheading: Career guidance description
  - CTAs: "Get Started Free" (primary), "Watch Demo" (outline)
  - Hero image with glass overlay
- **FeaturesSection**: 6 feature cards in 3-column grid
  - AI-Powered Career Guidance (Brain icon)
  - Interview Preparation (Target icon)
  - Industry Insights (TrendingUp icon)
  - Smart Resume Creation (FileText icon)
  - Cover Letter Generator (Sparkles icon)
  - Career Path Planning (Shield icon)
- **StatsSection**: Animated counters
  - 50,000+ Professionals
  - 85% Interview Success Rate
  - 10,000+ Resumes Created
  - 95% Career Satisfaction
- **HowItWorksSection**: 4 steps with connecting line
  - Step 01: Professional Onboarding
  - Step 02: Craft Your Documents
  - Step 03: Prepare for Interviews
  - Step 04: Track Your Progress
- **TestimonialsSection**: Carousel with quotes from users
- **FAQSection**: Accordion with 6 common questions
- **CTASection**: Final call-to-action with gradient background
- **Footer**: Links, social icons, copyright

### 2. Sign In Page (`/signin`)
- Clerk SignIn component with custom theming
- Logo header
- Social login options (Google, GitHub)
- Email/password form
- Terms & Privacy Policy links

### 3. Sign Up Page (`/signup`)
- Clerk SignUp component with custom theming
- Similar layout to Sign In

### 4. Dashboard (`/dashboard`) - Protected
**Sections:**
- **Top Nav**: Logo, Profile Settings, Notifications, Logout
- **Welcome Header**: "Welcome back, [Name]!" with Pro Member badge
- **Stats Cards** (4 cards):
  - Applications Sent
  - Interviews Scheduled
  - ATS Score (%)
  - AI Sessions Today
- **Career Progress Card**: Progress bars for profile completion, resume optimization, etc.
- **Quick Actions Grid**:
  - Optimize Resume
  - Practice Interview
  - Job Matching
  - Career Insights
- **Sidebar Cards**:
  - AI Career Coach (CTA to start session)
  - Upcoming Events (interviews)
  - Recent Activity feed

### 5. Profile Page (`/dashboard/profile`)
- User profile management
- Skills management
- Experience history

### 6. Resume Page (`/dashboard/resume`)
- Resume upload/management
- AI analysis results
- ATS optimization scores

### 7. Interview Prep (`/dashboard/interview`)
- Mock interview practice
- AI-generated questions
- Performance feedback

### 8. Job Matching (`/dashboard/jobs`)
- AI-powered job recommendations
- Match scores
- Application tracking

### 9. Career Insights (`/dashboard/insights`)
- Analytics dashboard
- Industry trends
- Salary data

---

## 🔐 Authentication Flow

Uses **Clerk** for authentication:
1. User clicks "Sign In" or "Get Started"
2. Redirects to `/signin` or `/signup`
3. Clerk handles OAuth (Google, GitHub) or email/password
4. On success, redirects to `/dashboard`
5. Protected routes use `<SignedIn>` / `<SignedOut>` wrappers
6. Token stored and sent with API requests

**Clerk Theme Customization:**
```javascript
appearance={{
  variables: {
    colorPrimary: 'hsl(173, 80%, 50%)',
    colorBackground: 'hsl(222, 47%, 8%)',
    colorInputBackground: 'hsl(222, 30%, 12%, 0.5)',
    colorInputText: 'hsl(210, 40%, 98%)',
    colorText: 'hsl(210, 40%, 98%)',
    borderRadius: '0.75rem',
    fontFamily: 'Inter, sans-serif',
  }
}}
```

---

## 🧩 Key Components

### Button Variants
- `default`: Solid primary
- `hero`: Gradient with glow effect
- `hero-outline`: Transparent with border
- `glass`: Glassmorphism style
- `outline`, `ghost`, `link`, `destructive`

### Card Component
- Glass card effect with blur
- Border with reduced opacity
- Hover state with border color change

### Progress Bar
- Themed with primary color
- Rounded ends

---

## 📁 Project Structure

```
src/
├── assets/
│   └── hero-image.jpg
├── components/
│   ├── ui/                    # Shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── accordion.tsx
│   │   └── ... (other UI primitives)
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── StatsSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── FAQSection.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── useDashboardData.ts
├── lib/
│   ├── api.ts                # Axios API client
│   └── utils.ts              # Utility functions (cn)
├── pages/
│   ├── Index.tsx             # Landing page
│   ├── SignIn.tsx
│   ├── SignUp.tsx
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   ├── Resume.tsx
│   ├── InterviewPrep.tsx
│   ├── JobMatching.tsx
│   ├── CareerInsights.tsx
│   └── NotFound.tsx
├── App.tsx                   # Router + providers
├── main.tsx                  # Entry point
└── index.css                 # Global styles + design tokens
```

---

## 🎭 Animations

### Entry Animations
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Continuous Animations
- `floating`: Gentle up/down float (6s infinite)
- `pulse-glow`: Pulsing shadow glow (2s infinite)
- `shimmer`: Loading skeleton effect
- `gradient-shift`: Moving gradient background

### Animation Delays
Use `.stagger-1` through `.stagger-4` with `.fade-in-up` for cascading effects.

---

## 🔧 Environment Variables

```env
# Frontend
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:5000

# Backend (if using Express)
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_test_...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
GEMINI_API_KEY=...
```

---

## 🚀 Key Features to Implement

1. **Resume Upload & Analysis**
   - File upload (PDF, DOCX)
   - AI analysis with scoring
   - Improvement suggestions

2. **Interview Preparation**
   - AI-generated questions by role/company
   - Mock interview sessions
   - Performance tracking

3. **Job Matching**
   - Profile-based job recommendations
   - Match score calculations
   - Application tracking

4. **Career Insights**
   - Industry trends
   - Salary benchmarks
   - Skill gap analysis

5. **AI Career Coach**
   - Conversational AI assistant
   - Personalized advice
   - Goal tracking

---

## 📱 Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px (container max-width)

---

## 🎯 Logo Design

**JobGeniusAI Logo:**
- Hexagon icon (border) with Brain icon inside
- Teal/cyan color (#0FF roughly)
- Text: "JobGenius" (white) + "AI" (gradient teal-cyan)
- Font: Sora Bold

---

## 📋 Required Dependencies

```json
{
  "@clerk/clerk-react": "^5.x",
  "@radix-ui/react-*": "various",
  "axios": "^1.x",
  "class-variance-authority": "^0.7.x",
  "clsx": "^2.x",
  "lucide-react": "^0.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "tailwind-merge": "^2.x",
  "tailwindcss": "^3.x",
  "tailwindcss-animate": "^1.x"
}
```

---

## 🎨 Design Inspiration Notes

- **Aesthetic**: Modern, dark, professional with tech-forward feel
- **Vibe**: Premium SaaS product, trustworthy, AI-powered
- **Accent**: Teal/Cyan creates futuristic, AI-centric mood
- **Effects**: Subtle glassmorphism, glows, and smooth animations
- **Layout**: Clean sections with generous whitespace
- **Typography**: Strong display headings with readable body text

---

## ✅ Checklist for Recreation

1. [ ] Set up Vite + React + TypeScript
2. [ ] Install and configure Tailwind CSS
3. [ ] Add Shadcn/ui components
4. [ ] Configure design tokens in index.css
5. [ ] Set up React Router with protected routes
6. [ ] Integrate Clerk authentication
7. [ ] Build landing page sections
8. [ ] Build dashboard with cards and stats
9. [ ] Add animations and effects
10. [ ] Connect to backend APIs (optional)
