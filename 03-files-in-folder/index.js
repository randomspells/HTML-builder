const { readdir } = require('fs/promises');
const { stat } = require('fs');
const { resolve, extname, basename } = require('path');

const folderPath = resolve(__dirname, 'secret-folder');

async function getFilesInFolder() {
  const files = await readdir(folderPath, {
    encoding: 'utf-8',
    withFileTypes: true,
  });
  return files;
}

getFilesInFolder()
  .then((files) =>
    files.forEach((file) => {
      if (file.isFile()) {
        const fullPath = resolve(folderPath, file.name);
        const ext = extname(fullPath);
        const name = basename(file.name, ext);
        stat(fullPath, (err, stats) => {
          if (err) console.error(err);
          const size = stats.size / 1024;
          console.log(`${name} - ${ext.slice(1)} - ${size}KB`);
        });
      }
    })
  )
  .catch((err) => console.error(err));
