export const fileNameFormat = (fileName) => {
  return fileName.toLowerCase().replace(/\s+/g, '_').replace(/_+/g, '_');
};
