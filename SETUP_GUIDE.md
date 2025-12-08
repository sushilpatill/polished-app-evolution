# Setup Guide - JobGenius AI Resume Optimizer

This guide will help you configure the AI Resume Optimizer feature, which is essential for students and entry-level professionals.

## Required API Keys

### 1. Google Gemini AI (Required for Resume Analysis)

The AI Resume Optimizer uses Google's Gemini AI to provide intelligent feedback on resumes.

**Get Your API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Why it's needed:** Gemini AI provides:
- Student-friendly resume analysis
- ATS (Applicant Tracking System) compatibility scoring
- Specific suggestions for entry-level resumes
- Skills recommendations based on resume content
- Tips for academic projects, internships, and coursework

### 2. Cloudinary (Required for Resume File Storage)

Cloudinary stores uploaded resume files securely in the cloud.

**Get Your Credentials:**
1. Visit [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. Go to your Dashboard
3. Find your Cloud Name, API Key, and API Secret
4. Add them to your `.env` file

```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Why it's needed:**
- Secure cloud storage for resume files
- Easy access and download of uploaded resumes
- Automatic cleanup when resumes are deleted

### 3. Complete Environment Configuration

Your `backend/.env` file should include:

```env
PORT=5000
NODE_ENV=development

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Database
DATABASE_URL=your_database_url_here

# Frontend URL
FRONTEND_URL=http://localhost:8080

# Google Gemini AI (Required for resume analysis)
GEMINI_API_KEY=your_gemini_api_key_here

# Cloudinary (Required for resume uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Features for Students

The AI Resume Optimizer is specifically designed for students and entry-level professionals:

### What it analyzes:
- ✅ Resume structure and formatting
- ✅ ATS compatibility (how well it works with job application systems)
- ✅ Academic projects and coursework
- ✅ Internship experiences
- ✅ Skills relevance for target roles
- ✅ Contact information and portfolio links

### What it suggests:
- 💡 Quantifiable achievements to add
- 💡 Relevant coursework to highlight
- 💡 Free certifications to earn (Coursera, Google, AWS)
- 💡 GitHub portfolio recommendations
- 💡 How to present academic projects as experience
- 💡 Action verbs and formatting improvements

### Student-Friendly Validation:
- Projects count as experience
- Academic coursework is valued
- More lenient for entry-level resumes
- Helpful tips instead of harsh errors

## Testing the Feature

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend:
```bash
cd frontend
npm run dev
```

3. Navigate to the Resume page in the application

4. Upload a test resume (PDF or Word document)

5. The AI will analyze it and provide:
   - Overall strength score (0-100)
   - ATS compatibility score (0-100)
   - Specific strengths in the resume
   - Actionable improvements
   - Suggested skills to add
   - Strategic recommendations for students

## Troubleshooting

### "AI analysis unavailable"
- Check that `GEMINI_API_KEY` is set in your `.env` file
- Verify the API key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)

### "Failed to upload file"
- Check that Cloudinary credentials are correct
- Verify your Cloudinary account is active
- Check file size (limit is 5MB)

### Resume appears empty
- Ensure the PDF/Word document has extractable text (not just images)
- Try re-saving your resume as a standard PDF

## Need Help?

If you encounter issues:
1. Check the backend console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure your API keys have the necessary permissions
4. Check that your file format is supported (PDF or DOCX)

For more information, see the main [README.md](./README.md)
