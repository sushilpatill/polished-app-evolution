import express, { Request, Response } from 'express';
import multer from 'multer';
import { requireAuth, getCurrentUserId } from '../middleware/auth';
import prisma from '../lib/prisma';
import { uploadToCloudinary } from '../lib/cloudinary';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /api/resumes/upload
router.post('/upload', requireAuth, upload.single('resume'), async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, req.file.originalname, 'resumes');

    // Save to database
    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        fileName: req.file.originalname,
        fileUrl: uploadResult.url,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        aiAnalysis: { placeholder: true },
        strengthScore: 75,
        suggestions: ['Resume uploaded successfully'],
      },
    });

    return res.status(201).json({
      success: true,
      data: resume,
      message: 'Resume uploaded successfully!'
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/resumes
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

export default router;
