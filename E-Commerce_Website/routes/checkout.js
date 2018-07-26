var express = require('express');
var router = express.Router();
var payment_controller = require('../controllers/payment_controller');

router.post('/pay', payment_controller.pay);

module.exports = router;