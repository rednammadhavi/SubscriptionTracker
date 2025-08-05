import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        cost: Number,
        cycle: {
            type: String,
            enum: ['monthly', 'yearly']
        },
        category: String,
        startDate: Date,
        reminderMode: {
            type: String,
            enum: ['email', 'sms'],
            default: 'email'
        }
    },
    { timestamps: true }
);

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
