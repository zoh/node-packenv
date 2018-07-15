#!/usr/bin/env node

const fs = require('fs');
const inFile = process.argv[2];
let outFile = '.env_file';
let outFileJson = 'res.json';
// const zlib = require('zlib');

// var deflated = zlib.deflateSync(input).toString('base64');
// var inflated = zlib.inflateSync(Buffer.from(deflated, 'base64')).toString();
//
// console.log(deflated.length, input.length, inflated.length);

if (process.argv.includes('-h')) {
  console.log('packenv', '[input file json]', '[-o output_file]', '-- make env file with single param PACKENV');
  process.exit(0);
}

// match file after -o
for (let i = 0; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a === '-o') {
    outFileJson = outFile = process.argv[i + 1];

    if (!outFile) {
      console.error('Define -o param, but not set output file');
      process.exit(1)
    }
  }
}

if (!inFile) {
  console.error('File input ' + inFile + ' not found.');
  process.exit(1);
}

if (fs.existsSync(inFile)) {
  const data = fs.readFileSync(inFile);

  if (process.argv.includes('-d')) {
    createFileJSON(data);
    return;
  }

  try {
    // test parse
    console.log('From file json to:', outFile);
    JSON.parse(data);
    createFileENV(data);
  } catch (e) {
    console.error(e);
  } finally {
    console.log('Success!');
  }
}


function createFileENV(data) {
  fs.writeFileSync(outFile, 'PACKENV=' + Buffer.from(data).toString('base64'));
}

function createFileJSON(data) {
  data = data.toString().replace('PACKENV=', '');
  fs.writeFileSync(outFileJson, Buffer.from(data, 'base64').toString('utf8'));
}

