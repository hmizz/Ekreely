const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(req.header.authorization);
    jwt.verify(token, "secret_key");
    next();
  } catch (err) {
    res.status(401).json({ message: 'No valid token' });
  }
};

