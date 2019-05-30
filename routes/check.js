const passport = require('../middleware/passport');
const express = require('express');
const router = express.Router();
//http://localhost:5000/checkToken
router.post('/', passport, function (req, res) {

});
module.exports = router;