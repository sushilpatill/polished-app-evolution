import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Protect routes that require authentication
export const requireAuth = ClerkExpressRequireAuth({
  onError: (error: any) => {
    console.error('Clerk auth error:', error);
  }
});

// Optional auth - adds user info if present but doesn't require it
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  // Clerk will attach user info to req.auth if present
  next();
};

// Get current user ID from authenticated request
export const getCurrentUserId = (req: Request): string | null => {
  return (req as any).auth?.userId || null;
};
