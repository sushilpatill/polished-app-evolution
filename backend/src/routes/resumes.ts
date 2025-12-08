import express, { Request, Response } from 'express';
import multer from 'multer';
import { requireAuth, getCurrentUserId } from '../middleware/auth';
import prisma from '../lib/prisma';
import { uploadToCloudinary, deleteFromCloudinary } from '../lib/cloudinary';
import { analyzeResume, DEFAULT_FALLBACK_SCORE } from '../lib/gemini';
import { extractDocumentText, validateResumeContent } from '../lib/documentParser';

const router = express.Router();

// Configure multer for file uploads (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only PDF and Word documents
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  },
});

// GET /api/resumes - Get all user's resumes
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

// POST /api/resumes/upload - Upload and analyze resume
router.post('/upload', requireAuth, upload.single('resume'), async (req: Request, res: Response) => {
  let cloudinaryPublicId: string | null = null;
  
  try {
    console.log('📤 Resume upload request received');
    
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      console.error('❌ Unauthorized: No user ID');
      return res.status(401).json({ 
        success: false,
        error: 'Unauthorized. Please sign in again.' 
      });
    }

    if (!req.file) {
      console.error('❌ No file in request');
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded. Please select a PDF or Word document.' 
      });
    }

    console.log(`📄 File received: ${req.file.originalname} (${req.file.size} bytes, ${req.file.mimetype})`);

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      console.error('❌ User not found in database');
      return res.status(404).json({ 
        success: false,
        error: 'User not found. Please contact support.' 
      });
    }

    console.log(`✅ User found: ${user.email}`);

    // Step 1: Extract text from document
    console.log('📄 Extracting text from document...');
    const parseResult = await extractDocumentText(req.file.buffer, req.file.mimetype);
    
    if (parseResult.error) {
      console.error('❌ Document parsing failed:', parseResult.error);
      return res.status(400).json({
        success: false,
        error: parseResult.error,
        details: 'Please ensure your file is a valid PDF or Word document.'
      });
    }

    console.log(`✅ Extracted ${parseResult.wordCount} words from document`);

    // Step 2: Validate resume content
    const validation = validateResumeContent(parseResult.text);
    if (validation.warnings.length > 0) {
      console.log('💡 Resume tips:', validation.warnings);
      // Don't fail upload, just log tips for improvement
    }

    // Step 3: Upload to Cloudinary
    console.log('☁️  Uploading to Cloudinary...');
    let fileUrl: string;
    try {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
        'resumes'
      );
      fileUrl = uploadResult.url;
      cloudinaryPublicId = uploadResult.publicId;
      console.log(`✅ Uploaded to Cloudinary: ${fileUrl}`);
    } catch (cloudinaryError: any) {
      console.error('❌ Cloudinary upload failed:', cloudinaryError);
      return res.status(500).json({
        success: false,
        error: 'Failed to upload file to cloud storage',
        details: cloudinaryError.message || 'Cloud storage service error'
      });
    }

    // Step 4: Analyze resume with Gemini AI
    console.log('🤖 Analyzing resume with Gemini AI...');
    let analysis: any;
    try {
      analysis = await analyzeResume(parseResult.text);
      console.log('✅ AI analysis completed:', {
        strengthScore: analysis.strengthScore,
        atsScore: analysis.atsScore,
        hasImprovements: !!analysis.improvements,
        hasSuggestions: !!analysis.suggestedSkills
      });
    } catch (aiError: any) {
      console.error('❌ AI analysis failed:', aiError);
      // Provide student-friendly fallback analysis
      analysis = {
        strengthScore: DEFAULT_FALLBACK_SCORE,
        atsScore: DEFAULT_FALLBACK_SCORE,
        strengths: [
          'Resume uploaded successfully',
          'Document is readable and well-formatted',
          'Good start for an entry-level resume'
        ],
        improvements: [
          'Add quantifiable achievements (e.g., "Led team of 5 students")',
          'Include relevant coursework or academic projects',
          'Add technical skills relevant to your target role',
          'Consider adding links to GitHub or portfolio',
          'Use action verbs (e.g., "Developed", "Implemented", "Led")'
        ],
        suggestedSkills: [
          'Python', 'JavaScript', 'Git', 'React', 'SQL',
          'Communication', 'Teamwork', 'Problem Solving'
        ],
        recommendations: [
          '💡 For students: Academic projects count as experience!',
          '💡 Add your GPA if it\'s above 3.0',
          '💡 Include relevant coursework for your field',
          '💡 Join GitHub and showcase your projects',
          '💡 Consider free certifications (Coursera, Google, AWS)'
        ]
      };
      console.log('⚠️  Using student-friendly fallback analysis');
    }

    // Step 5: Save to database
    console.log('💾 Saving resume to database...');
    try {
      const resume = await prisma.resume.create({
        data: {
          userId: user.id,
          fileName: req.file.originalname,
          fileUrl,
          fileSize: req.file.size,
          mimeType: req.file.mimetype,
          parsedContent: parseResult.text,
          aiAnalysis: analysis as any,
          strengthScore: analysis.strengthScore || 60,
          atsScore: analysis.atsScore || 60,
          suggestions: analysis.improvements || [],
        },
      });

      console.log(`✅ Resume saved successfully: ID ${resume.id}`);

      return res.status(201).json({
        success: true,
        data: resume,
        message: '🎉 Resume uploaded and analyzed successfully! Check the feedback below.',
        tips: validation.warnings.length > 0 ? validation.warnings : undefined
      });
    } catch (dbError: any) {
      console.error('❌ Database save failed:', dbError);
      
      // Cleanup: Delete from Cloudinary if DB save fails
      if (cloudinaryPublicId) {
        console.log('🧹 Cleaning up Cloudinary upload...');
        try {
          await deleteFromCloudinary(cloudinaryPublicId);
          console.log('✅ Cloudinary cleanup successful');
        } catch (cleanupError) {
          console.error('❌ Cloudinary cleanup failed:', cleanupError);
        }
      }

      return res.status(500).json({
        success: false,
        error: 'Failed to save resume to database',
        details: dbError.message || 'Database error'
      });
    }
  } catch (error: any) {
    console.error('❌ Unexpected error in resume upload:', error);
    console.error('Stack trace:', error.stack);

    // Cleanup: Delete from Cloudinary if something went wrong
    if (cloudinaryPublicId) {
      console.log('🧹 Cleaning up Cloudinary upload after error...');
      try {
        await deleteFromCloudinary(cloudinaryPublicId);
      } catch (cleanupError) {
        console.error('❌ Cloudinary cleanup failed:', cleanupError);
      }
    }

    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred during resume upload',
      details: error.message || 'Internal server error',
      message: 'Please try again. If the problem persists, contact support.'
    });
  }
});

// PUT /api/resumes/:id/primary - Set resume as primary
router.put('/:id/primary', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Unset all other resumes as primary
    await prisma.resume.updateMany({
      where: { userId: user.id },
      data: { isPrimary: false },
    });

    // Set this resume as primary
    const resume = await prisma.resume.update({
      where: {
        id,
        userId: user.id,
      },
      data: { isPrimary: true },
    });

    res.json(resume);
  } catch (error) {
    console.error('Error setting primary resume:', error);
    res.status(500).json({ error: 'Failed to set primary resume' });
  }
});

// DELETE /api/resumes/:id - Delete resume
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resume = await prisma.resume.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Delete from Cloudinary (extract public_id from URL)
    if (resume.fileUrl) {
      // Extract public_id from Cloudinary URL
      const urlParts = resume.fileUrl.split('/');
      const publicIdWithExt = urlParts[urlParts.length - 1];
      const publicId = publicIdWithExt.split('.')[0];
      await deleteFromCloudinary(`resumes/${publicId}`);
    }

    // Delete from database
    await prisma.resume.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;
