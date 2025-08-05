import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { getAlertLogs } from '../controllers/alert.controller.js';

const router = express.Router();

router.route('/logs').get(verifyJwt, getAlertLogs)

export default router;
