import { AlertLog } from '../models//alertLog.models.js';

const getAlertLogs = async (req, res) => {
    try {
        const logs = await AlertLog.find({ userId: req.user }).populate('subscriptionId');
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { getAlertLogs };
