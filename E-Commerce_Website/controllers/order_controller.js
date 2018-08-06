var Cart = require('../models/cart_model');
var Order = new require('../models/order_model');
var paypal_controller = require('../controllers/paypal_controller');

exports.order_data = function (req, res, next) {
    var cart = new Cart(req.session.cart);
    var paymentID = paypal_controller.PaymentID;
    var order = new Order ({
        user: req.user,
        cart: cart,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        paymentID: paymentID
    });

    order.save(function (err, result) {
        req.session.cart = null;
        res.redirect('/');
    });
};