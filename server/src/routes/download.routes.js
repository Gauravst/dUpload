import { Router } from 'express';
import { downloadData } from '../controllers/download.controllers.js';

const router = Router();

router.route('/').post(downloadData);

export default router;
