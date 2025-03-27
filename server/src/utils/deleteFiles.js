import fs from 'fs/promises';

export const deleteFiles = async (filePaths) => {
  try {
    filePaths.map(async (filePath) => {
      await fs.unlink(filePath);
    });
  } catch (error) {
    console.error('Failed to delete files:', error);
  }
};
