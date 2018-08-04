var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        max: 20
    },
    product_name: {
        type: String,
        required: true,
        max: 20
    },
    product_desc: {
        type: String,
        required: true,
        max: 100
    },
    price: {
        type: Number,
        required: true
    },
    available_quantity: {
        type: Number,
        required: true
    },
    seller: {
        type: String,
        required: true,
        max: 30
    }
});
module.exports = mongoose.model('Product', ProductSchema);