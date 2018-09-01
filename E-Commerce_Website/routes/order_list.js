var express = require('express');
var router = express.Router();
var order_controller = require('../controllers/order_controller');
var user_controller = require('../controllers/user_controller');
var email_controller = require('../controllers/email_controller');

router.get('/list', user_controller.isUserLogin, order_controller.orderList);

router.get('/email/:id', email_controller.email_page);

router.post('/email/:id', email_controller.email_send);

module.exports = router;