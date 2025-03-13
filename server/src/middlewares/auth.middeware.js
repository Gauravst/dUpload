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
