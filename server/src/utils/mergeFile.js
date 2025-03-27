import fs from 'fs';
import path from 'path';

export const mergeFiles = async (chunkPaths, fileFullName) => {
  // Ensure the tmp directory exists
  const tmpDir = path.join(process.cwd(), 'tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  // Correct way to define the output file path
  const outputFilePath = path.join(tmpDir, fileFullName);
  const writeStream = fs.createWriteStream(outputFilePath);

  for (const chunkPath of Array.isArray(chunkPaths)
    ? chunkPaths
    : [chunkPaths]) {
    await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(chunkPath);
      readStream.on('end', resolve);
      readStream.on('error', reject);
      readStream.pipe(writeStream, { end: false });
    });
  }

  writeStream.end(() => {
    console.log(`Merged file saved at: ${outputFilePath}`);
  });

  return outputFilePath;
};
