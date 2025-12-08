import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY is not defined - AI features will be disabled');
}

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// Use gemini-2.0-flash (gemini-pro is deprecated)
export const geminiModel = genAI ? genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }) : null;

/**
 * Analyze resume content using Gemini AI
 */
export async function analyzeResume(resumeText: string) {
  if (!geminiModel) {
    return {
      strengthScore: 0,
      improvements: ['AI analysis unavailable - API key not configured'],
      raw: 'Gemini AI not configured'
    };
  }

  const prompt = `You are an expert career coach and resume analyst. Analyze the following resume and provide:

1. Overall strength score (0-100)
2. Key strengths (list 3-5 points)
3. Areas for improvement (list 3-5 points)
4. Suggested skills to add
5. ATS (Applicant Tracking System) compatibility score
6. Industry-specific recommendations

Resume content:
${resumeText}

Provide the response in JSON format with these keys: strengthScore, strengths, improvements, suggestedSkills, atsScore, recommendations`;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    // Try to parse as JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { raw: text };
  } catch (error) {
    return { raw: text };
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
