var paypal = require('paypal-rest-sdk');

exports.pay = function (req, res, next) {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/checkout/success",
            "cancel_url": "http://localhost:3000/checkout/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    // total amount of the items and total amount here must be the same
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
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

exports.success = function (res, req, next) {
    var payerID = req.params.PayerID;
    var paymentID = req.params.paymentId;

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
            res.send('Success');
        }
    });
};

exports.cancel = function (res, req, next) {
    res.send('Cancelled');
};