const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: 'default.png'
    },
    active: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 1
    },
    weight: {
        type: Number,
        default: 1
    },
}, { timestamps: true });

module.exports = model("Item", ItemSchema);
