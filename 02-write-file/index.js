const { stdin, stdout } = require('process');
const path = require('path');
const fs = require('fs');
const rl = require('readline').createInterface({
  input: stdin,
  output: stdout,
});

const filePath = path.join(__dirname, 'output.txt');
const writeableStream = fs.createWriteStream(filePath);

function closeProcess() {
  stdout.write('Program is shutting down. Good bye!');
  rl.close();
}

rl.on('SIGINT', closeProcess);

rl.on('programStart', () =>
  console.log("Hello! Give me some text and check 'output.txt'")
);

rl.emit('programStart');

const infiniteReadline = () => {
  rl.question("Wait for text or 'exit' command...\n", (answer) => {
    if (answer === 'exit') return closeProcess();
    if (answer.length === 0) console.log("Empty strings don't count!");
    else writeableStream.write(answer + '\n');
    infiniteReadline();
  });
};

infiniteReadline();
