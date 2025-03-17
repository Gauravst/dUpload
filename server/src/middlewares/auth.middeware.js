import jwt from 'jsonwebtoken';
import pool from '../db/connect.js';

export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = {
      ///
    };
    req.user = user;
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

export const verifyAccessToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err && err.name === 'TokenExpiredError') {
      try {
        const userQuery = `
          SELECT id, strategy, refreshToken FROM users WHERE id = $1;
        `;
        const { rows } = await pool.query(userQuery, [decoded.id]);

        if (rows.length === 0 || !rows[0].refreshToken) {
          return res
            .status(403)
            .json({ message: 'Refresh token invalid or not found' });
        }

        const user = rows[0];

        // Verify refresh token from DB
        jwt.verify(
          user.refreshToken,
          process.env.JWT_REFRESH_SECRET,
          (refreshErr, refreshDecoded) => {
            if (refreshErr) {
              return res
                .status(403)
                .json({ message: 'Refresh token expired or invalid' });
            }

            // Generate new access token
            const newAccessToken = jwt.sign(
              { id: user.id, strategy: user.strategy },
              process.env.JWT_SECRET,
              { expiresIn: '15m' }
            );

            // Set new access token in cookies
            res.cookie('accessToken', newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'Strict',
            });

            req.user = { id: user.id, strategy: user.strategy };
            return next();
          }
        );
      } catch (error) {
        console.error('Error fetching refresh token from DB:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }

    if (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }

    req.user = decoded;
    next();
  });
};
