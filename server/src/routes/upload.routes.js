import { Router } from 'express';
import { uploadData } from '../controllers/upload.controllers.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/').post(upload.array('file', 4), uploadData);

export default router;
