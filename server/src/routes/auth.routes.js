import { Router } from 'express';
import passport from '../utils/passport.js';
import {
  authCallback,
  getUser,
  logoutUser,
} from '../controllers/auth.controllers.js';
import { verifyAccessToken } from '../middlewares/auth.middeware.js';

const router = Router();

// google auth route
router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

// githhub auth route
router
  .route('/google')
  .get(passport.authenticate('github', { scope: ['user:email'] }));

// google auth callback
router
  .route('/google/callback')
  .get(passport.authenticate('google', { session: false }), authCallback);

// GitHub Auth Routes
router
  .route('/github/callback')
  .get(passport.authenticate('github', { session: false }), authCallback);

// Get User & Logout
router.route('/user').get(verifyAccessToken, getUser);
router.route('/logout').post(verifyAccessToken, logoutUser);

export default router;
