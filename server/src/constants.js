// User roles constants
export const availableUserRoles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};
export const availableUserRolesEnum = Object.values(availableUserRoles);

export const allowedImgExtensions = {
  jpg: '.jpg',
  png: '.png',
  jpeg: '.jpeg',
  webp: '.webp',
  mp4: '.mp4',
  mp3: '.mp3',
  pdf: '.pdf',
  txt: '.txt',
};
export const allowedImgExtensionsEnum = Object.values(allowedImgExtensions);

// URI base path
export const BASEPATH = '/api';

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
