import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js'

const router = express.Router();

import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    updateAccountDetails
} from '../controllers/auth.controller.js';

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJwt, logoutUser)
router.route('/me').get(verifyJwt, getCurrentUser)
router.route('/settings').put(verifyJwt, updateAccountDetails)

export default router;
