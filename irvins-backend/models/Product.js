const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number, // mongoose.Decimal128
        required: true,
    },
    description: String,
    image: String,
    tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Products', ProductSchema);