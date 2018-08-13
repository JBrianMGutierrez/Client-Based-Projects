var mongoose = require('mongoose');
var OrderSchema = mongoose.Schema;
var schema = new OrderSchema({
    user: {
        type: OrderSchema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
        type: Object,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    address_1: {
        type: String,
        required: true
    },
    address_2: {
        type: String,
    },
    paymentID: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Order', schema);