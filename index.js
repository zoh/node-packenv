

function parseObjectFromENV(data = process.env.PACKENV) {

  if (!data) {
    throw 'empty params';
  }

  return JSON.parse(Buffer.from(data || '', 'base64').toString('utf8'));
}


module.exports = {
  parseObjectFromENV
};