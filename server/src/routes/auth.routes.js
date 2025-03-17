import { Router } from 'express';
import passport from '../utils/passport.js';
import { getUser, logout } from '../controllers/auth.controllers.js';

const router = Router();

// Google Auth Routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    if (!req.user || !req.user.tokens) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const { accessToken } = req.user.tokens;

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

// GitHub Auth Routes
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    if (!req.user || !req.user.tokens) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const { accessToken } = req.user.tokens;

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

// Get User & Logout
router.get('/user', getUser);
router.get('/logout', logout);

export default router;
