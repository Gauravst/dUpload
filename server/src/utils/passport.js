import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import pool from '../db/connect.js';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // try catch here and save data in db in here
      try {
        const strategy = 'google';
        const strategyId = profile.id;
        const name = profile.displayName || profile.username;
        const email = profile.emails?.[0]?.value || null;
        const profilePic = profile.photos?.[0]?.value || null;

        const query = `
          INSERT INTO users (name, email, profilePic, strategy, strategyId, createdAt, updatedAt)
          VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          ON CONFLICT (strategy, strategyId) DO UPDATE 
          SET 
            name = EXCLUDED.name, 
            email = EXCLUDED.email, 
            profilePic = EXCLUDED.profilePic, 
            updatedAt = CURRENT_TIMESTAMP
          RETURNING *;
        `;

        const values = [name, email, profilePic, strategy, strategyId];
        const result = await pool.query(query, values);

        console.log('Inserted/Updated Google User:', result.rows[0]);
        return done(null, result.rows[0]); // Pass user data to Passport
      } catch (error) {
        console.error('Error saving Google user:', error);
      }
      return done(null, profile);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // try catch here and save data in db in here
      try {
        const strategy = 'github';
        const strategyId = profile.id;
        const name = profile.displayName || profile.username;
        const email = profile.emails?.[0]?.value || null;
        const profilePic = profile.photos?.[0]?.value || null;

        const query = `INSERT INTO users (name, email, profilePic, strategy, strategyId, createdAt, updatedAt)
                       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                       ON CONFLICT (strategy, strategyId) DO UPDATE 
                       SET 
                       name = EXCLUDED.name, 
                       email = EXCLUDED.email, 
                       profilePic = EXCLUDED.profilePic, 
                       updatedAt = CURRENT_TIMESTAMP
                       RETURNING *;
`;
        const values = [name, email, profilePic, strategy, strategyId];

        const result = await pool.query(query, values);
        console.log('Inserted User:', result.rows[0]);
      } catch (error) {
        console.error(error);
      }
      return done(null, profile);
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
