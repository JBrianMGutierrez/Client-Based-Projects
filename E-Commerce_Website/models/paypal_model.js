var Cart = require('../models/cart_model');
module.exports = function Paypal(){
    this.create_payment_json = function(cart, totalCost) {
        var work = cart.forEach(function (product) {
            var arrayList = [{
                "name": product.item.product_name,
                "description": product.item.product_desc,
                "sku": product.item.product_id,
                "price": product.item.price,
                "currency": "PHP",
                "quantity": product.item.quantity
            }];
            return JSON.stringify(arrayList)
        });
        return {
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
                    "items": work
                },
                "amount": {
                    "currency": "PHP",
                    "total": totalCost
                },
                "description": "This is the payment description."
            }],
            "note_to_payer": "Contact us for any questions on your order."
        };
    };
    this.execute_payment_json = function (payerID, totalCost) {
        return {
            "payer_id": payerID,
            "transactions": [{
                "amount": {
                    "currency": "PHP",
                    "total": totalCost
                }
            }]
        };
    };
};










