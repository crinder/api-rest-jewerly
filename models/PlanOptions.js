import mongoose from "mongoose";

const { Schema } = mongoose;

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
        }
    },
    { timestamps: true }
);

export default mongoose.model("Plan", PlanSchema);
