var Cart = require('../models/cart_model');
var Order = new require('../models/order_model');
var paypal_controller = require('../controllers/paypal_controller');

exports.order_data = function (req, res, next) {
    var cart = new Cart(req.session.cart);
    var paymentID = paypal_controller.paymentID;
    var order = new Order ({
        user: req.user,
        cart: cart,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        paymentID: paymentID,
        status: "Pending"
    });

    Order.create(order, function (err, result) {
        if(err){
            return next(err);
        } else {
            req.session.cart = null;
            res.redirect('/');
        }
    });
};