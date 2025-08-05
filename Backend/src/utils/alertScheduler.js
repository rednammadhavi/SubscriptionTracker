import cron from 'node-cron';
import Subscription from '../models/subscription.models.js';
import User from '../models/user.models.js';
import AlertLog from '../models/alertLog.models.js';
import sendEmail from './sendEmail.js';
import sendSMS from './sendSMS.js';

cron.schedule('0 9 * * *', async () => {
    const today = new Date();
    const users = await User.find();

    for (const user of users) {
        const subs = await Subscription.find({ userId: user._id });

        for (const sub of subs) {
            const daysSinceStart = Math.floor((today - new Date(sub.startDate)) / (1000 * 60 * 60 * 24));
            const cycleDays = sub.cycle === 'monthly' ? 30 : 365;

            if (daysSinceStart % cycleDays === 0) {
                const alreadySent = await AlertLog.findOne({
                    userId: user._id,
                    subscriptionId: sub._id,
                    sentAt: { $gte: new Date(today.setHours(0, 0, 0, 0)) },
                });

                if (!alreadySent) {
                    if (sub.reminderMode === 'email') {
                        await sendEmail(user.email, sub.name, sub.cost);
                    } else {
                        await sendSMS(user.phone, sub.name, sub.cost); // Make sure phone is stored
                    }

                    await new AlertLog({
                        userId: user._id,
                        subscriptionId: sub._id,
                        sentAt: new Date(),
                        mode: sub.reminderMode,
                    }).save();
                }
            }
        }
    }
});
