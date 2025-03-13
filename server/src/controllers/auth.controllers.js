import { asyncHandler } from '../utils/asyncHandler.js';

export const getUser = asyncHandler(async (req, res) => {
  res.send(req.user ? req.user : null);
});

export const logout = asyncHandler(async (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_URL);
  });
});
