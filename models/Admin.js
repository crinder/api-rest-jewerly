import mongoose from "mongoose";

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


export const Admin = mongoose.model("Admin", AdminSchema);
