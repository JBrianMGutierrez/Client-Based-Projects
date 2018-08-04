var express = require('express');
var router = express.Router();
var paypal_controller = require('../controllers/paypal_controller');

router.post('/pay', paypal_controller.pay);

router.get('/success', paypal_controller.success);

router.get('/cancel', paypal_controller.cancel);

module.exports = router;