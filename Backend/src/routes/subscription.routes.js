import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

import {
    addSubscription,
    getSubscriptions,
    updateSubscription,
    deleteSubscription
} from '../controllers/subscription.controller.js';

router.route('/').post(verifyJwt, addSubscription)
router.route('/').get(verifyJwt, getSubscriptions)
router.route('/:id').put(verifyJwt, updateSubscription)
router.route('/:id').delete(verifyJwt, deleteSubscription)

export default router;
