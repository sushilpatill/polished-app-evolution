import express, { Request, Response } from 'express';
import { z } from 'zod';
import { requireAuth, getCurrentUserId } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Validation schemas
const profileSchema = z.object({
  headline: z.string().min(1).max(200).optional(),
  summary: z.string().max(2000).optional(),
  location: z.string().max(100).optional(),
  phoneNumber: z.string().min(10).max(20).optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  currentCompany: z.string().max(100).optional(),
  currentRole: z.string().max(100).optional(),
  yearsOfExperience: z.number().min(0).max(50).optional(),
  salaryExpectation: z.number().min(0).optional(),
  noticePeriod: z.number().min(0).optional(),
  desiredRoles: z.array(z.string()).optional(),
  desiredLocations: z.array(z.string()).optional(),
  workType: z.enum(['REMOTE', 'HYBRID', 'ONSITE']).optional(),
  jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE']).optional(),
});

const skillSchema = z.object({
  name: z.string().min(1).max(50),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  yearsUsed: z.number().min(0).max(50).optional(),
});

const experienceSchema = z.object({
  company: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  location: z.string().max(100).optional(),
  startDate: z.string(), // ISO date string
  endDate: z.string().optional(), // ISO date string
  isCurrently: z.boolean().default(false),
  description: z.string().max(2000).optional(),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
});

// Calculate profile strength (0-100)
const calculateProfileStrength = (profile: any): number => {
  let score = 0;
  const weights = {
    basicInfo: 20,
    summary: 10,
    socialLinks: 15,
    experience: 20,
    skills: 20,
    preferences: 15,
  };

  // Basic info (headline, phoneNumber, location)
  if (profile.headline) score += weights.basicInfo / 3;
  if (profile.phoneNumber) score += weights.basicInfo / 3;
  if (profile.location) score += weights.basicInfo / 3;

  // Summary
  if (profile.summary && profile.summary.length > 50) score += weights.summary;

  // Social links
  if (profile.linkedinUrl) score += weights.socialLinks / 3;
  if (profile.githubUrl) score += weights.socialLinks / 3;
  if (profile.portfolioUrl) score += weights.socialLinks / 3;

  // Experience
  if (profile.yearsOfExperience && profile.yearsOfExperience > 0) score += weights.experience / 2;
  if (profile.currentRole) score += weights.experience / 2;

  // Preferences
  if (profile.desiredRoles && profile.desiredRoles.length > 0) score += weights.preferences / 2;
  if (profile.workType) score += weights.preferences / 2;

  return Math.round(score);
};

// GET /api/profile - Get user profile
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      // Auto-create user if webhook hasn't synced yet
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: 'temp@example.com', // Will be updated by webhook
          profile: {
            create: {
              profileStrength: 0,
            },
          },
        },
        include: {
          profile: true,
        },
      });
    }

    // Get or create profile
    let profile = await prisma.profile.findUnique({
      where: { userId: user.id },
      include: {
        skills: true,
        experience: true,
        education: true,
        certifications: true,
      },
    });

    if (!profile) {
      // Create profile if it doesn't exist
      profile = await prisma.profile.create({
        data: {
          userId: user.id,
          profileStrength: 0,
        },
        include: {
          skills: true,
          experience: true,
          education: true,
          certifications: true,
        },
      });
    }

    // Add skills to strength calculation
    let profileStrength = calculateProfileStrength(profile);
    if (profile.skills && profile.skills.length > 0) {
      profileStrength = Math.min(100, profileStrength + 20);
    }

    res.json({ ...profile, profileStrength });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT /api/profile - Update user profile
router.put('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const validatedData = profileSchema.parse(req.body);

    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: validatedData,
      include: {
        skills: true,
        experience: true,
      },
    });

    // Calculate and update profile strength
    let profileStrength = calculateProfileStrength(updatedProfile);
    if (updatedProfile.skills && updatedProfile.skills.length > 0) {
      profileStrength = Math.min(100, profileStrength + 20);
    }

    await prisma.profile.update({
      where: { userId },
      data: { profileStrength },
    });

    res.json({ ...updatedProfile, profileStrength });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues });
    }
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// POST /api/profile/skills - Add skill
router.post('/skills', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const validatedData = skillSchema.parse(req.body);

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const skill = await prisma.skill.create({
      data: {
        ...validatedData,
        profileId: profile.id,
      },
    });

    res.status(201).json(skill);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues });
    }
    console.error('Error adding skill:', error);
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

// DELETE /api/profile/skills/:id - Remove skill
router.delete('/skills/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    await prisma.skill.delete({
      where: {
        id,
        profileId: profile.id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

// POST /api/profile/experience - Add work experience
router.post('/experience', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const validatedData = experienceSchema.parse(req.body);

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const experience = await prisma.experience.create({
      data: {
        company: validatedData.company,
        role: validatedData.role,
        location: validatedData.location,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        isCurrently: validatedData.isCurrently,
        description: validatedData.description,
        achievements: validatedData.achievements || [],
        technologies: validatedData.technologies || [],
        profileId: profile.id,
      },
    });

    res.status(201).json(experience);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.issues });
    }
    console.error('Error adding experience:', error);
    res.status(500).json({ error: 'Failed to add experience' });
  }
});

// DELETE /api/profile/experience/:id - Remove work experience
router.delete('/experience/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    await prisma.experience.delete({
      where: {
        id,
        profileId: profile.id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

export default router;
