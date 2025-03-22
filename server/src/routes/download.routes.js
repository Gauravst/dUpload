import { Router } from 'express';
import { downloadData } from '../controllers/download.controllers.js';
import { verifyAccessToken } from '../middlewares/auth.middeware.js';

const router = Router();

router.route('/:fileId').get(verifyAccessToken, downloadData);
//to shere and download url
//add new download function (check file pubic or )
// need more route to make file pubic and privet
router.route('/p/:fileId').get(downloadData);

export default router;
