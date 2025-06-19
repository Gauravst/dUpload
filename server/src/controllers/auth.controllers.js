import { asyncHandler } from '../utils/asyncHandler.js';
import pool from '../db/connect.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { cookieOptions } from '../constants.js';
import { findOrCreateUser } from '../utils/passport.js';
import crypto from 'crypto';

export const getUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { data: req.user }, 'user data'));
});

export const continueWithoutAuth = asyncHandler(async (_, res) => {
  const randomStr = () => crypto.randomBytes(4).toString('hex');

  const name = `Guest-${randomStr()}`;
  const email = `${randomStr()}@tempuser.com`;
  const id = randomStr();

  const userData = {
    name,
    email,
    profilePic: null,
    strategy: 'withoutAuth',
    strategyId: id,
  };

  const { tokens, user } = await findOrCreateUser(userData);

  return res
    .status(200)
    .cookie('accessToken', tokens.accessToken, cookieOptions)
    .json(new ApiResponse(200, { data: user }, 'user data'));
});

export const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user) {
    const query = `UPDATE users 
                   SET refreshToken = '' 
                   WHERE id = $1; `;

    const values = [user.id];
    await pool.query(query, values);
  }

  return res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .json(new ApiResponse(200, 'user logged out'));
});

export const authCallback = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.tokens) {
    throw new ApiError(401, 'Authentication failed');
  }

  const { accessToken } = req.user.tokens;
  return res
    .cookie('accessToken', accessToken, cookieOptions)
    .redirect(`${process.env.CLIENT_URL}/dashboard`);
});
