const jwt = require('jsonwebtoken');
const secret = 'sssh... its a secret';

module.exports.jsonwebtoken = {
  jwt,
  secret,
  sign: function (payload) {
    return jwt.sign(payload, secret);
  },
  verify: function (token) {
    try {
      const user = jwt.verify(token, secret);
      return user;
    } catch(e) {
      return null;
    }
  }
};
