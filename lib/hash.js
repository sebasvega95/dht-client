const crypto = require('crypto');

exports.getKey = value => {
  const hash = crypto.createHash('sha256');
  hash.update(value);
  return hash.digest('hex').substr(0, 10);
};
