import { Schema } from "mongoose";

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: String,
    active: {
        type: Boolean,
        default: true
    },
    weight: {
        type: Number,
        default: 1
    },
}, { timestamps: true });

export const Item = mongoose.model("Item", ItemSchema);
