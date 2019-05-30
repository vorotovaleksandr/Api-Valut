const express = require('express');
const controller = require('../controllers/auth');
const router = express.Router();

// localhost:5000/auth/login
router.post('/login', controller.login);
// localhost:5000/auth/register
router.post('/register', controller.register);
// localhost:5000/auth/get
router.post('/get', controller.get);
// localhost:5000/auth/update
router.post('/get', controller.update);
module.exports = router;