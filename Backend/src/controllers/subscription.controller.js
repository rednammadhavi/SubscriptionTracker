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
        const subscriptions = await Subscription.find({
            userId: req.user,
            isDeleted: false,
        }).sort({ createdAt: -1 });
        res.json(subscriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOneAndUpdate(
            { _id: req.params.id, userId: req.user, isDeleted: false },
            req.body,
            { new: true }
        );
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found or already deleted.' });
        }
        res.json(subscription);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteSubscription = async (req, res) => {
    try {
        const result = await Subscription.findOneAndUpdate(
            { _id: req.params.id, userId: req.user, isDeleted: false },
            { isDeleted: true }
        );
        if (!result) {
            return res.status(404).json({ message: 'Subscription not found or already deleted.' });
        }
        res.json({ message: 'Moved to trash.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDeletedSubscriptions = async (req, res) => {
    try {
        const deleted = await Subscription.find({
            userId: req.user,
            isDeleted: true,
        }).sort({ updatedAt: -1 }); // Optional: recently deleted first
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const restoreSubscription = async (req, res) => {
    try {
        const restored = await Subscription.findOneAndUpdate(
            { _id: req.params.id, userId: req.user, isDeleted: true },
            { isDeleted: false },
            { new: true }
        );
        if (!restored) {
            return res.status(404).json({ message: 'Subscription not found in trash.' });
        }
        res.json({ message: 'Restored successfully.', subscription: restored });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteSubscriptionPermanently = async (req, res) => {
    try {
        const deleted = await Subscription.findOneAndDelete({
            _id: req.params.id,
            userId: req.user,
            isDeleted: true,
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Subscription not found in trash.' });
        }
        res.json({ message: 'Deleted permanently.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {
    addSubscription,
    getSubscriptions,
    updateSubscription,
    deleteSubscription,
    getDeletedSubscriptions,
    restoreSubscription,
    deleteSubscriptionPermanently,
};
