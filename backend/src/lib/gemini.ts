import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY is not defined - AI features will be disabled');
}

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// Use gemini-2.0-flash (gemini-pro is deprecated)
export const geminiModel = genAI ? genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }) : null;

// Default scores for fallback analysis (exported for use in other modules)
export const DEFAULT_FALLBACK_SCORE = 60;
export const DEFAULT_ERROR_SCORE = 50;

/**
 * Analyze resume content using Gemini AI
 * Optimized for students and entry-level professionals
 */
export async function analyzeResume(resumeText: string) {
  if (!geminiModel) {
    return {
      strengthScore: 0,
      improvements: ['AI analysis unavailable - API key not configured'],
      raw: 'Gemini AI not configured'
    };
  }

  const prompt = `You are an expert career coach specializing in helping students and entry-level professionals. Analyze the following resume with a focus on early-career needs.

IMPORTANT CONTEXT:
- This may be a student resume (academic projects, coursework, internships are valuable)
- Entry-level candidates may have less work experience but compensate with projects, skills, and education
- Be encouraging and constructive - focus on what's done well AND what can be improved
- Consider academic projects, volunteer work, and extracurricular activities as legitimate experience

Resume content:
${resumeText}

Provide detailed analysis including:

1. **strengthScore** (0-100): Overall resume quality considering entry-level expectations
2. **atsScore** (0-100): How well it will perform with Applicant Tracking Systems
3. **strengths** (array): 3-5 specific things done well (e.g., "Clear education section", "Quantified achievements")
4. **improvements** (array): 3-5 actionable suggestions specific to this resume (e.g., "Add GPA if above 3.5", "Include relevant coursework")
5. **suggestedSkills** (array): 5-10 relevant skills to consider adding based on their field
6. **recommendations** (array): 3-5 strategic recommendations for students/entry-level (e.g., "Highlight academic projects", "Add link to GitHub portfolio")

STUDENT-SPECIFIC GUIDANCE:
- If limited work experience: Suggest highlighting academic projects, coursework, clubs, volunteer work
- Recommend adding: GitHub/portfolio links, relevant coursework, certifications (free ones like Coursera, Google certificates)
- Suggest quantifying achievements (e.g., "Led team of 5", "Improved efficiency by 20%")
- Recommend action verbs and concrete examples
- Mention formatting improvements (consistency, clear sections, professional email)

Return ONLY valid JSON with these exact keys: strengthScore, atsScore, strengths, improvements, suggestedSkills, recommendations

Example format:
{
  "strengthScore": 75,
  "atsScore": 80,
  "strengths": ["Clear contact information", "Well-structured education section"],
  "improvements": ["Add quantifiable achievements", "Include relevant projects"],
  "suggestedSkills": ["Python", "Git", "React"],
  "recommendations": ["Create a GitHub portfolio", "Add GPA if above 3.0"]
}`;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse as JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate and ensure all required fields exist
      return {
        strengthScore: parsed.strengthScore || DEFAULT_ERROR_SCORE,
        atsScore: parsed.atsScore || DEFAULT_ERROR_SCORE,
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
        improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
        suggestedSkills: Array.isArray(parsed.suggestedSkills) ? parsed.suggestedSkills : [],
        recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : []
      };
    }
    
    // If no JSON found, return fallback
    return { 
      strengthScore: DEFAULT_ERROR_SCORE,
      atsScore: DEFAULT_ERROR_SCORE,
      strengths: ['Resume uploaded successfully'],
      improvements: ['AI analysis format error - please try again'],
      suggestedSkills: [],
      recommendations: ['Unable to parse AI response. Please try uploading again.']
    };
  } catch (error: any) {
    console.error('Error analyzing resume:', error);
    return { 
      strengthScore: DEFAULT_ERROR_SCORE,
      atsScore: DEFAULT_ERROR_SCORE,
      strengths: ['Resume uploaded successfully'],
      improvements: ['AI analysis error - please try again later'],
      suggestedSkills: [],
      recommendations: []
    };
  }
}

/**
 * Generate personalized career advice
 */
export async function generateCareerAdvice(profile: any) {
  if (!geminiModel) {
    return 'AI career advice is temporarily unavailable. Please configure your Gemini API key.';
  }

  const prompt = `You are an expert career coach. Based on this professional profile, provide personalized career advice:

Current Role: ${profile.currentRole || 'Not specified'}
Years of Experience: ${profile.yearsOfExperience || 'Not specified'}
Skills: ${profile.skills?.join(', ') || 'Not specified'}
Desired Roles: ${profile.desiredRoles?.join(', ') || 'Not specified'}

Provide advice on:
1. Career growth opportunities
2. Skills to develop
3. Networking strategies
4. Industry trends to watch
5. Next career moves

Keep it concise and actionable.`;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

/**
 * Generate interview preparation questions
 */
export async function generateInterviewQuestions(jobTitle: string, company: string) {
  if (!geminiModel) {
    return [];
  }

  const prompt = `Generate 10 interview questions for a ${jobTitle} position at ${company}. Include:
- 3 behavioral questions
- 4 technical/role-specific questions
- 3 company-specific questions

Format as JSON array with: { question, type, tips }`;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return [];
  } catch (error) {
    return [];
  }
}

/**
 * Match jobs to user profile
 */
export async function matchJobToProfile(jobDescription: string, userProfile: any) {
  if (!geminiModel) {
    return { raw: 'AI job matching is temporarily unavailable. Please configure your Gemini API key.' };
  }

  const prompt = `You are a job matching expert. Calculate how well this job matches the candidate's profile.

Job Description:
${jobDescription}

Candidate Profile:
- Skills: ${userProfile.skills?.join(', ')}
- Experience: ${userProfile.yearsOfExperience} years
- Current Role: ${userProfile.currentRole}

Provide:
1. Match score (0-100)
2. Matching skills
3. Missing skills
4. Recommendation (Apply/Maybe/Skip)
5. Reasons

Response in JSON format.`;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { raw: text };
  } catch (error) {
    return { raw: text };
  }
}

export default geminiModel;
