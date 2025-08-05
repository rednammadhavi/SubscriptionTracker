import { Subscription } from '../models/subscription.models.js';

const getAnalytics = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ userId: req.user });

        const monthlyTotal = subscriptions.reduce((acc, sub) => {
            const months = sub.cycle === 'monthly' ? 1 : 12;
            return acc + sub.cost / months;
        }, 0);

        const categoryBreakdown = {};
        subscriptions.forEach((sub) => {
            const months = sub.cycle === 'monthly' ? 1 : 12;
            const monthly = sub.cost / months;
            categoryBreakdown[sub.category] = (categoryBreakdown[sub.category] || 0) + monthly;
        });

        res.json({ monthlyTotal, categoryBreakdown });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export { getAnalytics };