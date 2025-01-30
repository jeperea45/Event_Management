const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
message: {
    status: 429,
    message: 'Demasiados intentos de inicio de sesión. Por favor, inténtalo más tarde.',
},
});

module.exports = { loginLimiter };
