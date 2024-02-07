import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    socialMediaLink: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_photo: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['influencer', 'admin'],
        default: 'influencer',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'disabled'],
        default: 'pending',
        required: true,
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;