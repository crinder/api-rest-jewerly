const { Schema, model } = require('mongoose');

const PlanOptionSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    turns: {
        type: Number,
        required: true
    },
    bonusTurns: {
        type: Number,
        default: 0
    },
    probabilityBoost: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
});

const PlanSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        description: String,
        active: {
            type: Boolean,
            default: true
        },
        order: Number,
        options: [PlanOptionSchema],
        metadata: {
            color: String,
            badge: String
        },
        availableItems: [
            {
                item: { type: Schema.Types.ObjectId, ref: "Item" },
                chance: { type: Number, default: 10 },
                isGrandPrize: { type: Boolean, default: false }
            }
        ]
    },
    { timestamps: true }
);

module.exports = model("Plan", PlanSchema);
