import express from 'express';
import { registerUser, loginUser, VerifyEmail, logoutUser, forgotPassword } from '../controllers/authentication.js';

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/forgotpassword', forgotPassword);

// Verification route
router.post('/verify', VerifyEmail);



export default router;