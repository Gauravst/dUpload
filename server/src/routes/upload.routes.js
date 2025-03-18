import { Router } from 'express';
import { uploadData } from '../controllers/upload.controllers.js';
import { verifyAccessToken } from '../middlewares/auth.middeware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/').post(verifyAccessToken, upload.array('file', 4), uploadData);

export default router;
