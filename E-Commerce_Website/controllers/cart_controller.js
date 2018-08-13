var Product = new require('../models/product_model');
var Cart = require('../models/cart_model');

exports.mode_of_payment = function(req, res, next) {
    res.render('shop/mode_of_payment');
};

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

exports.shopping_cart_page = function (req, res, next) {
    if (!req.session.cart) {
        return res.render ('shop/shopping_cart', { products: null, title: 'Shopping Cart' });
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping_cart', { products: cart.generateItemsInArray(), totalPrice: cart.totalCost, title: 'Shopping Cart' });
};

exports.checkout = function (req, res, next) {
    if(!req.session.cart){
        return res.redirect('/shopping_cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', { products: cart.generateItemsInArray(), totalPrice: cart.totalCost, item: cart.items, title: 'Checkout' });
};