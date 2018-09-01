var Product = new require('../models/product_model');

exports.home = function(req, res, next) {
    Product.find({}, function (err, products) {
        if(err){
            return next(err);
        } else {
            res.render('shop/index', { title: 'E-Commerce', products: products});
        }
    });
};

exports.addItem = function(req, res, next) {
    res.render('product/add_item', { title: 'E-Commerce'});
};

exports.product_create = function(req, res, next) {
    if (req.body.product_id &&
        req.body.product_name &&
        req.body.product_desc &&
        req.body.price &&
        req.body.available_quantity &&
        req.body.seller);{
        var product = {
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            product_desc: req.body.product_desc,
            price: req.body.price,
            available_quantity: req.body.available_quantity,
            seller: req.body.seller
        };
        Product.create(product, function (err) {
            if (err) {
                return next(err);
            } else {
                res.redirect('/');
            }
        })
    }
};

exports.product_read = function (req, res, next) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            return next(err);
        } else {
            res.render('product/view_item', { title: 'E-Commerce', product: product});
        }
    });
};

exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, products) {
        if (err) return next(err);
        res.render('shop/view_item', { title: 'E-Commerce', product: products});
    })
};

exports.product_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.redirect('/');
    })
};