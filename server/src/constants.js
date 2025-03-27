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
  svg: '.svg',
};
export const allowedImgExtensionsEnum = Object.values(allowedImgExtensions);

// URI base path
export const BASEPATH = '/api';

// Local http PORT
export const PORT = 5000;

// cookie options
const isProduction = process.env.NODE_ENV === 'production';
export const cookieOptions = {
  path: '/',
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'None' : 'Lax',
  maxAge: 30 * 24 * 60 * 60 * 1000,
};
