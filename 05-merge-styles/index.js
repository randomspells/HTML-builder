const { readdir, readFile, appendFile } = require('fs/promises');
const fs = require('fs');
const { resolve, extname } = require('path');

// Для тестовых файлов закомментируйте две строки ниже и включите остальные
// Бандл будет в папке 'test-files'
const styleFolder = resolve(__dirname, 'styles');
const distFolder = resolve(__dirname, 'project-dist');
// const styleFolder = resolve(__dirname, 'test-files/styles');
// const distFolder = resolve(__dirname, 'test-files');

const bundlePath = resolve(distFolder, 'bundle.css');

async function getFilesInFolder() {
  const files = await readdir(styleFolder, {
    encoding: 'utf8',
    withFileTypes: true,
  });
  return files;
}

getFilesInFolder()
  .then((files) => {
    const chunks = [];
    files.map((file) => {
      const path = resolve(styleFolder, file.name);
      if (file.isFile() && extname(path) === '.css') {
        const data = readFile(path, 'utf8');
        chunks.push(data);
      }
    });
    return Promise.all(chunks);
  })
  .then((chunks) => {
    fs.writeFile(bundlePath, '', (err) => {
      if (err) console.error(err);
    });
    return chunks;
  })
  .then((chunks) => {
    chunks.map((chunk) => {
      fs.appendFile(bundlePath, `${chunk}\n`, (err) => {
        if (err) console.error(err);
      });
    });
  });
