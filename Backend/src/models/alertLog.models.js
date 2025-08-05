import mongoose from 'mongoose';

const alertLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        subscriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription'
        },
        sentAt: Date,
        mode: String
    }, { timestamps: true }
);

export const AlertLog = mongoose.model('AlertLog', alertLogSchema);
