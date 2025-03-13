import { Router } from 'express';
import { uploadData } from '../controllers/file.controllers.js';

const router = Router();

router.route('/').post(upload.array('file', 4), uploadData);

export default router;
