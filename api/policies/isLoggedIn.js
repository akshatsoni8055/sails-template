const { verify } = sails.config.jsonwebtoken;

module.exports = async function (req, res, next) {

  var token = req.body.token || req.query.token || req.headers.Authorization;

  if (!token) {
    return res.unauthorized();
  }

  const me = verify(token);

  if (me) {
    req.me = me;
    return next();
  } else {
    return res.unauthorized();
  }

};
