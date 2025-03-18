import { Router } from 'express';
import {
  createNewFolder,
  getAllFiles,
  getAllFolders,
  getOneFile,
  getOneFolder,
} from '../controllers/file.controllers.js';
import { verifyAccessToken } from '../middlewares/auth.middeware.js';

const router = Router();

router.route('/folder').get(verifyAccessToken, getAllFolders);
router.route('/folder').post(verifyAccessToken, createNewFolder);
router.route('/folder/:folderId').get(verifyAccessToken, getOneFolder);

router.route('/file').get(verifyAccessToken, getAllFiles);
router.route('/file/:fileId').get(verifyAccessToken, getOneFile);

export default router;
