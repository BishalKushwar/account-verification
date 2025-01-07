import express from 'express';
import { registerUser, loginUser, VerifyEmail, logoutUser, forgotPassword, resetPassword } from '../controllers/authentication.js';

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Forgot password route
router.post('/forgot-password', forgotPassword);

//reset password
router.post('/reset-password:token', resetPassword);

// Verification route
router.post('/verify', VerifyEmail);



export default router;