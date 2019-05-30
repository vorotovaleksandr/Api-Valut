const express = require('express');
const controller = require('../controllers/currency');
const router = express.Router();

// localhost:5000/currency/getall
router.post('/getall', controller.getAll);
// localhost:5000/currency/update
router.post('/update', controller.update);
// localhost:5000/currency/add
router.post('/add', controller.add);

module.exports = router;