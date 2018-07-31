var paypal = require('paypal-rest-sdk');
var Payment = require('../models/payment_model');

exports.pay = function (req, res, next) {
    paypal.payment.create(Payment.create_payment_json, function (error, payment) {
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
    var payerID = req.query.PayerID;
    var paymentID = req.query.paymentId;
    var execute_payment_json = {
        "payer_id": payerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };

    paypal.payment.execute(paymentID, execute_payment_json, function (error, payment) {
        if(error){
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.redirect('/');
        }
    });
};

exports.cancel = function (req, res, next) {
    res.send('Cancelled');
};
