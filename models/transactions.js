const {Schema, model} = require('mongoose');

const TransactionSchema = new Schema({
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: "Session",
        required: true
    },
    type: {
        type: String,
        enum: ["payment", "refund"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        default: "cash"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Transaction", TransactionSchema);
