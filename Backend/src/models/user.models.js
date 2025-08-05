import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
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
        alertMode: {
            type: String,
            enum: ['email', 'sms'],
            default: 'email'
        },
    },
    { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
