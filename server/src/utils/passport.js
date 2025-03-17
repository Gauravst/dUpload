import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import pool from '../db/connect.js';
import jwt from 'jsonwebtoken';

dotenv.config();

/**
 * 🔹 Helper function to generate access & refresh tokens
 */
const generateTokens = (userId, strategy) => {
  const accessToken = jwt.sign(
    { id: userId, strategy },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: userId, strategy },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

/**
 * 🔹 Helper function to insert or update user in database
 * - This prevents duplicate code for Google & GitHub auth
 */
const findOrCreateUser = async ({
  name,
  email,
  profilePic,
  strategy,
  strategyId,
}) => {
  try {
    const tokens = generateTokens(strategyId, strategy);

    const query = `
      INSERT INTO users (name, email, profilePic, strategy, strategyId, refreshToken)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (strategy, strategyId) DO UPDATE 
      SET 
        name = EXCLUDED.name, 
        email = EXCLUDED.email, 
        profilePic = EXCLUDED.profilePic, 
        refreshToken = EXCLUDED.refreshToken
      RETURNING *;
    `;

    const values = [
      name,
      email,
      profilePic,
      strategy,
      strategyId,
      tokens.refreshToken,
    ];

    const result = await pool.query(query, values);
    return { user: result.rows[0], tokens };
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

/**
 * 🔹 Google Authentication Strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userData = {
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value || null,
          profilePic: profile.photos?.[0]?.value || null,
          strategy: 'google',
          strategyId: profile.id,
        };

        // 🔹 Using the helper function
        const { user, tokens } = await findOrCreateUser(userData);
        return done(null, { user, tokens });
      } catch (error) {
        console.error('Google Auth Error:', error);
        return done(error);
      }
    }
  )
);

/**
 * 🔹 GitHub Authentication Strategy
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userData = {
          name: profile.displayName || profile.username,
          email: profile.emails?.[0]?.value || null,
          profilePic: profile.photos?.[0]?.value || null,
          strategy: 'github',
          strategyId: profile.id,
        };

        // 🔹 Using the helper function
        const { user, tokens } = await findOrCreateUser(userData);
        return done(null, { user, tokens });
      } catch (error) {
        console.error('GitHub Auth Error:', error);
        return done(error);
      }
    }
  )
);

/**
 * 🔹 Serialize & Deserialize User for Sessions
 */
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
