var Order = new require('../models/order_model');
var email_config = require('../config/email_config');
var MailOptions = require('../models/email_model');
var counter = 0;
exports.email_page = function (req, res, next) {
    Order.findById(req.params.id, function(err, orders) {
        if (err) {
            return next(err);
        } else {
            res.render('email/email_form', { title: 'Email Form', orders: orders.cart.items, cart: orders.cart, emailID: req.params.id})
        }
    });
};

exports.email_send = function (req, res, next) {
    //find order then pass it to the mailOptions
    var mailOptions = new MailOptions();
    var transporter = email_config.config;
    transporter.sendMail(mailOptions.mailFramework(req.body), function (error, result) {
        if(error) {
            throw error;
        } else {
            var requiredEmail = 0;
            Order.findByIdAndUpdate(req.params.id, {$set: {status: 'Purchased'}}, function(err, orders) {

                if (err){
                    return next(err);
                }
                var array1 = orders.cart.items;
                var array2 = orders.cart.items;
                Object.keys(array1).forEach(function(element) {
                    if(array2[element].item.seller === array1[element].item.seller){
                        requiredEmail++
                    } else {

                    }
                });
                if(counter < requiredEmail){
                    counter =+ 2;
                    res.redirect('/order/email/' + req.params.id);
                } else {
                    res.redirect('/order/list');
                }
            });


        }
    });

};

