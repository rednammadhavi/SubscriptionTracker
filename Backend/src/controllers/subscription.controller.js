import { Subscription } from '../models/subscription.models.js';

const addSubscription = async (req, res) => {
    try {
        const subscription = new Subscription({ ...req.body, userId: req.user });
        await subscription.save();
        res.status(201).json(subscription);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ userId: req.user });
        res.json(subscriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOneAndUpdate(
            { _id: req.params.id, userId: req.user },
            req.body,
            { new: true }
        );
        res.json(subscription);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteSubscription = async (req, res) => {
    try {
        await Subscription.findOneAndDelete({ _id: req.params.id, userId: req.user });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {
    addSubscription,
    getSubscriptions,
    updateSubscription,
    deleteSubscription
};