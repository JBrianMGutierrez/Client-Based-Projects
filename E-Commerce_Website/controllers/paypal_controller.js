var paypal = require('paypal-rest-sdk');
var Paypal = require('../models/paypal_model');
var Cart = require('../models/cart_model');

exports.pay = function (req, res, next) {
    var create_json = new Paypal();
    var cart = new Cart(req.session.cart);
    paypal.payment.create(create_json.create_payment_json(cart), function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let counter = 0 ; counter < payment.links.length ; counter++){
                if(payment.links[counter].rel === 'approval_url'){
                    res.redirect(payment.links[counter].href);
                }
            }
        }
    });
};

exports.success = function (req, res, next) {
    /** @namespace req.query.PayerID */
    var payerID = req.query.PayerID;
    /** @namespace req.query.paymentId */
    var paymentID = req.query.paymentId;
    var execute_json = new Paypal(req.session.cart);
    paypal.payment.execute(paymentID, execute_json.execute_payment_json(payerID), function (error, payment) {
        if(error){
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            req.session.cart = null;
            res.redirect('/');
        }
    });
};

exports.cancel = function (req, res, next) {
    res.send('Cancelled');
};
