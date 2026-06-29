import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpiry: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
