import { Router, Request, Response } from 'express';
import { requireAuth, getCurrentUserId } from '../middleware/auth';

const router = Router();

// Get current user info
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Here you would fetch additional user data from your database
    res.json({
      userId,
      message: 'User authenticated successfully'
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sign out (handled by Clerk on frontend, but we can log it)
router.post('/signout', (req: Request, res: Response) => {
  res.json({ message: 'Signed out successfully' });
});

export default router;
