var Product = new require('../models/product_model');
var Cart = require('../models/cart_model');

exports.additem_to_cart = function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function (err, product) {
        if(err) {
            return res.redirect('/');
        } else {
            cart.add(product, product.id);
            req.session.cart = cart;
            res.redirect('/');
        }
    });
};