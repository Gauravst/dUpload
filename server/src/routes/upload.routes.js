import { Router } from 'express';
import { ensureAuth } from '../middlewares/auth.middeware.js';
import {
  createNewFolder,
  getAllFiles,
  getAllFolders,
  getOneFile,
  getOneFolder,
} from '../controllers/file.controllers.js';

const router = Router();

router.route('/folder').get(getAllFolders);
router.route('/folder').post(ensureAuth, createNewFolder);
router.route('/folder/:folderId').get(getOneFolder);

router.route('/file').get(getAllFiles);
router.route('/file/:fileId').get(getOneFile);

export default router;
