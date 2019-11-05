const jwt = require('jsonwebtoken');

// Format of token -> (Authorization: Bearer <access_token>)

// Verify Token
function verifyToken(req, res, next) {
  // Get Auth header value
  const bearerHeader = req.header('auth-token');

  // Check if bearer is available
  if (!bearerHeader) return res.status(401).send('Access Denied.No token provided');
  try {
    const verified = jwt.verify(bearerHeader, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

module.exports = verifyToken;