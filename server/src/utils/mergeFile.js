import fs from 'fs';

export const mergeFiles = async (chunkPaths, outputFilePath) => {
  const writeStream = fs.createWriteStream(outputFilePath);

  for (const chunkPath of chunkPaths) {
    await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(chunkPath);

      readStream.pipe(writeStream, { end: false });

      readStream.on('end', resolve);
      readStream.on('error', reject);
    });
  }

  writeStream.end();
  console.log(`Merged file saved at: ${outputFilePath}`);
};
