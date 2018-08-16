var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/product_controller');
var cart_controller = require('../controllers/cart_controller');
var user_controller = require('../controllers/user_controller');

/* GET home page. */
router.get('/', product_controller.home);

router.get('/add_to_cart/:id', cart_controller.additem_to_cart);

router.get('/shopping_cart', cart_controller.shopping_cart_page);

router.get('/mode_of_payment', user_controller.CheckoutLogin, cart_controller.mode_of_payment);

router.get('/checkout', user_controller.CheckoutLogin, cart_controller.checkout);

module.exports = router;
