import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { getAnalytics } from '../controllers/analytics.controller.js';

const router = express.Router();

router.route('/').get(verifyJwt, getAnalytics)

export default router;
