import mongoose from "mongoose";

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

export const Transaction = mongoose.model("Transaction", TransactionSchema);
