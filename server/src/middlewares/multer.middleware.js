import path from 'path';
import multer from 'multer';
import { allowedImgExtensionsEnum } from '../constants.js';

export const upload = multer({
  dest: 'temp/',
  storage: multer.diskStorage({
    destination: 'tmp/',
    filename: (_, file, done) => {
      done(null, file.originalname);
    },
  }),
  fileFilter: (_, file, done) => {
    let ext = path.extname(file.originalname);
    if (!allowedImgExtensionsEnum.includes(ext)) {
      done(new Error(`Unsupported image type! ${ext}`), false);
      return;
    }
    done(null, true);
  },
});
