const express = require('express');
const controller = require('../controllers/currency');
const router = express.Router();

// localhost:5000/currency/add
router.get('/add', controller.add);
// localhost:5000/currency/getall
router.post('/getall', controller.getAll);
// localhost:5000/currency/update
router.post('/update', controller.update);
// localhost:5000/currency/get
router.post('/get', controller.get);
// localhost:5000/currency/updateDelete
router.post('/updateDelete', controller.updateDelete);

module.exports = router;