import { Router } from 'express';
import { Webhook } from 'svix';
import prisma from '../lib/prisma';

const router = Router();

/**
 * Clerk Webhook Handler
 * Syncs user data from Clerk to our database
 */
router.post('/clerk', async (req, res) => {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    // Get Svix headers for verification
    const svixId = req.headers['svix-id'] as string;
    const svixTimestamp = req.headers['svix-timestamp'] as string;
    const svixSignature = req.headers['svix-signature'] as string;

    if (!svixId || !svixTimestamp || !svixSignature) {
      return res.status(400).json({ error: 'Missing svix headers' });
    }

    // Verify webhook signature
    const wh = new Webhook(webhookSecret);
    let evt: any;

    try {
      evt = wh.verify(JSON.stringify(req.body), {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });
    } catch (err) {
      console.error('Webhook verification failed:', err);
      return res.status(400).json({ error: 'Webhook verification failed' });
    }

    const eventType = evt.type;
    const userData = evt.data;

    console.log('Clerk webhook received:', eventType);

    // Handle different event types
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(userData);
        break;
      
      case 'user.updated':
        await handleUserUpdated(userData);
        break;
      
      case 'user.deleted':
        await handleUserDeleted(userData);
        break;
      
      default:
        console.log('Unhandled event type:', eventType);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Handle user.created event
 */
async function handleUserCreated(data: any) {
  const { id, email_addresses, first_name, last_name, image_url } = data;
  
  const primaryEmail = email_addresses.find((e: any) => e.id === data.primary_email_address_id);
  
  await prisma.user.create({
    data: {
      clerkId: id,
      email: primaryEmail?.email_address || '',
      firstName: first_name,
      lastName: last_name,
      profileImage: image_url,
      lastLoginAt: new Date(),
      profile: {
        create: {
          profileStrength: 20, // Initial strength
        },
      },
    },
  });
  
  console.log('User created in database:', id);
}

/**
 * Handle user.updated event
 */
async function handleUserUpdated(data: any) {
  const { id, email_addresses, first_name, last_name, image_url } = data;
  
  const primaryEmail = email_addresses.find((e: any) => e.id === data.primary_email_address_id);
  
  await prisma.user.update({
    where: { clerkId: id },
    data: {
      email: primaryEmail?.email_address,
      firstName: first_name,
      lastName: last_name,
      profileImage: image_url,
      lastLoginAt: new Date(),
    },
  });
  
  console.log('User updated in database:', id);
}

/**
 * Handle user.deleted event
 */
async function handleUserDeleted(data: any) {
  const { id } = data;
  
  await prisma.user.delete({
    where: { clerkId: id },
  });
  
  console.log('User deleted from database:', id);
}

export default router;
