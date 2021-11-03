const path = require("path");
const { createReadStream } = require("fs");

const fullPath = path.resolve(__dirname, 'text.txt');
const stream = createReadStream(fullPath, "utf-8");

stream.on("data", chunk => {
  console.log(chunk);
})