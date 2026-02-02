const { Schema, model } = require('mongoose');

const SessionSchema = new Schema({
    planSnapshot: {
        planId: {
            type: Schema.Types.ObjectId, ref: "Plan",
            required: true
        },
        planCode: String,
        planName: String,
        optionId: Schema.Types.ObjectId,
        price: Number,
        turns: Number,
        bonusTurns: Number
    },
    status: {
        type: String,
        enum: ["active", "finished", "cancelled", "initial"],
        default: "active"
    },
    turnsUsed: {
        type: Number,
        default: 0
    },
    prizes: [
        {
            itemId: {
                type: Schema.Types.ObjectId,
                ref: "Item"
            },
            name: String,
            category: String,
            imageUrl: String,
            awardedAt: { type: Date, default: Date.now }
        }
    ],
    totalPaid: {
        type: Number,
        default: 0
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    finishedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = model("Session", SessionSchema);
