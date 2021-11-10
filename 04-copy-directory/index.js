const { readdir, copyFile, mkdir, rm, access } = require('fs/promises');
const { resolve } = require('path');

const oldFolderPath = resolve(__dirname, 'files');
const newFolderPath = resolve(__dirname, 'files-copy');

async function createFolder() {
  await rm(newFolderPath, { recursive: true, force: true });
  await mkdir(newFolderPath, (err) => {
    if (err) console.error(err);
  });
}

async function getFilesInFolder() {
  const files = await readdir(oldFolderPath, {
    encoding: 'utf-8',
    withFileTypes: true,
  });
  return files;
}

createFolder()
  .then(() => {
    getFilesInFolder()
      .then((files) => {
        files.forEach((file) => {
          const oldFilePath = resolve(oldFolderPath, file.name);
          const newFilePath = resolve(newFolderPath, file.name);
          copyFile(oldFilePath, newFilePath);
        });
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));
