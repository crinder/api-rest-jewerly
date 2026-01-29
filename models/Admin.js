const {Schema, model} = require('mongoose');

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin"
    },
    active: {
        type: Boolean,
        default: true
    },
    lastLoginAt: Date
}, { timestamps: true });


module.exports = model("Admin", AdminSchema);

