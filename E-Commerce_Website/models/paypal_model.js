module.exports = function Paypal(){
    this.create_payment_json = function(products) {
        return {
            "intent": "authorize",
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
                        "sku": "001",
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
            }],
            "note_to_payer": "Contact us for any questions on your order."
        };
    };

    this.capture_details = function() {
        return {
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "is_final_capture": true
        }
    };

    this.execute_payment_json = function (payerID) {
        return {
            "payer_id": payerID,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        };
    };
};










