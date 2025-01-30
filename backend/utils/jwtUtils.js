const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
};


const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
}   catch (error) {
        return null;
}
};

module.exports = { generateToken, verifyToken };
