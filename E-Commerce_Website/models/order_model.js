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
    email: {
        type: String,
        required: true
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