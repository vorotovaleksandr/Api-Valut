const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const withAuth = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, keys.jwt, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        //get email other use
        req.email = decoded.email;
        res.status( 200 ).json(req.email);
        next();
      }
    });
  }
};

module.exports = withAuth;