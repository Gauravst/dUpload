import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import pool from '../db/connect.js';
import jwt from 'jsonwebtoken';

dotenv.config();

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

const setRefreshToken = async (pool, token, userId) => {
  const query = `UPDATE users SET refreshToken = $1 WHERE id = $2`;
  const values = [token, userId];
  await pool.query(query, values);
};

const createMainFolder = async (pool, userId) => {
  const query = `
    INSERT INTO folder (userId, name, username)
    VALUES ($1, 'Main', 'main')
    ON CONFLICT (userId, name) DO NOTHING;
  `;
  const values = [userId];
  await pool.query(query, values);
};

export const findOrCreateUser = async ({
  name,
  email,
  profilePic,
  strategy,
  strategyId,
}) => {
  try {
    const query = `
      INSERT INTO users (name, email, profilePic, strategy, strategyId)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (strategy, strategyId) DO UPDATE 
      SET 
        name = EXCLUDED.name, 
        email = EXCLUDED.email, 
        profilePic = EXCLUDED.profilePic
      RETURNING *;
    `;

    const values = [name, email, profilePic, strategy, strategyId];

    const result = await pool.query(query, values);
    const user = result.rows[0];

    const tokens = generateTokens(user.id, strategy);

    await setRefreshToken(pool, tokens.refreshToken, user.id);
    await createMainFolder(pool, result.rows[0].id);

    return { user: user, tokens };
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

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

        const { user, tokens } = await findOrCreateUser(userData);
        return done(null, { user, tokens });
      } catch (error) {
        console.error('Google Auth Error:', error);
        return done(error);
      }
    }
  )
);

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

        const { user, tokens } = await findOrCreateUser(userData);
        return done(null, { user, tokens });
      } catch (error) {
        console.error('GitHub Auth Error:', error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
