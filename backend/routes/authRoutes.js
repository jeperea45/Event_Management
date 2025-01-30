const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const {loginLimiter} = require('../utils/rateLimiter');
const router = express.Router();

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.post('/logout', logout)

module.exports = router;