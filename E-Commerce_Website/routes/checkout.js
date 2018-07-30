var express = require('express');
var router = express.Router();
var payment_controller = require('../controllers/payment_controller');

router.post('/pay', payment_controller.pay);

router.get('/success', payment_controller.success);

router.get('/cancel', payment_controller.cancel);

module.exports = router;