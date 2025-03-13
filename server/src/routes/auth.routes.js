import { Router } from 'express';
import passport from '../utils/passport.js';
import { getUser, logout } from '../controllers/auth.controllers.js';

const router = Router();

// Google Auth Routes
router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/google/callback/').get(
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/auth/failure',
  })
);

// GitHub Auth Routes
router
  .route('/github')
  .get(passport.authenticate('github', { scope: ['user:email'] }));

router.route('github/callback').get(
  passport.authenticate('github', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/auth/failure',
  })
);

// Get User & Logout
router.get('/user', getUser);
router.get('/logout', logout);

export default router;
