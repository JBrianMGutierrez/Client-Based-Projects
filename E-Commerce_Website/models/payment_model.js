module.exports.create_payment_json = {
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
    }]
};








