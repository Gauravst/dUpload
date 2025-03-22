import fs from 'fs';
import path from 'path';

const makeChunks = async (files, size) => {
  const chunkSize = size * 1024;
  const chunksArray = [];

  for (const file of files) {
    const filePath = file.path;
    const fileName = path.basename(filePath);
    const fileBuffer = fs.readFileSync(filePath);
    const totalSize = fileBuffer.length;
    const totalChunks = Math.ceil(totalSize / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      const chunk = fileBuffer?.slice(start, end);

      const chunkName = `${fileName}_part${i + 1}`;
      const chunkPath = path.join(path.dirname(filePath), chunkName);

      fs.writeFileSync(chunkPath, chunk);
      console.log(`Created chunk: ${chunkPath}`);

      // Store chunk info
      chunksArray.push({ path: chunkPath, name: chunkName });
    }
  }

  return chunksArray;
};

// Example usage
export { makeChunks };
