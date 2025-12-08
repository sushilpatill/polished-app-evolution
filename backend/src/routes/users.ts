import { Router, Request, Response } from 'express';
import { requireAuth, getCurrentUserId } from '../middleware/auth';

const router = Router();

// Get user profile
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    const requestedUserId = req.params.id;

    // Check if user is requesting their own profile
    if (userId !== requestedUserId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Here you would fetch user data from your database
    res.json({
      userId,
      message: 'User profile retrieved successfully'
    });
  } catch (error) {
    console.error('User error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = getCurrentUserId(req);
    const requestedUserId = req.params.id;

    if (userId !== requestedUserId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Here you would update user data in your database
    res.json({
      userId,
      message: 'User profile updated successfully'
    });
  } catch (error) {
    console.error('User update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
