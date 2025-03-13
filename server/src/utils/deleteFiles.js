import fs from 'fs/promises';

export const deleteFiles = async (filePaths) => {
  try {
    await Promise.all(
      filePaths.map(async (filePath) => {
        try {
          await fs.unlink(filePath); // Delete file
          console.log(`🗑️ Deleted: ${filePath}`);
        } catch (error) {
          console.error(`❌ Error deleting ${filePath}:`, error.message);
        }
      })
    );
    console.log('✅ All files deleted successfully!');
  } catch (error) {
    console.error('❌ Failed to delete files:', error);
  }
};
