var express = require('express');
var router = express.Router();
var paypal_controller = require('../controllers/paypal_controller');
var order_controller = require('../controllers/order_controller');

router.post('/create', paypal_controller.create_order);

router.get('/success', paypal_controller.success);

router.get('/confirmation', paypal_controller.confirm_order);

router.post('/confirmation', order_controller.order_data);

router.get('/cancel', paypal_controller.cancel);

module.exports = router;