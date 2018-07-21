var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/product_controller');
var cart_controller = require('../controllers/cart_controller');

/* GET home page. */
router.get('/', product_controller.home);

router.get('/add_to_cart/:id', cart_controller.additem_to_cart);

module.exports = router;
