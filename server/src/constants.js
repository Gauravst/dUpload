// User roles constants
export const availableUserRoles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};
export const availableUserRolesEnum = Object.values(availableUserRoles);

// URI base path
export const BASEPATH = '/api/v1';

// Local http PORT
export const PORT = 5000;

// cookie options
export const cookieOptions = {
  secure: true,
  httpOnly: true,
  sameSite: 'none',
  path: '/',
  maxAge: 864000000, // 10 days
};
