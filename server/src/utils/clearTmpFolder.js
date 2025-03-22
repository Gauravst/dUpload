import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const clearTmpFolder = async () => {
  try {
    const tmpDir = path.join(__dirname, '../../tmp'); // Root-level tmp folder

    if (!fs.existsSync(tmpDir)) {
      console.log('⚠️ No tmp folder found, skipping...');
      return;
    }

    const files = await fs.promises.readdir(tmpDir);

    for (const file of files) {
      const filePath = path.join(tmpDir, file);
      await fs.promises.rm(filePath, { recursive: true, force: true });
    }

    console.log('✅ All files in tmp/ folder have been deleted!');
  } catch (error) {
    console.error('❌ Error clearing tmp folder:', error.message);
  }
};
