
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import generateVerificationCode from '../utils/generateVerificationCode.js';
import generateTokenandSetCookie from '../utils/generateTokenandSetCookie.js';
import { SendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';
// Register User
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationCode();

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        await user.save();

        // Send verification email
        await SendVerificationEmail(email, verificationToken);

        // Generate token and set cookie
        generateTokenandSetCookie(res, user);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const VerifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        })
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({
            message: 'Email verified successfully', user: {
                ...user._doc,
                password: undefined
            }
        });


    } catch (error) {
        console.error('Error in VerifyEmail:', error);
        res.status(500).json({ message: 'Server error' });

    }

};


// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        // generateTokenandSetCookie(res, user._id);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            token, user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
    try {
        const updates = req.body;

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in updateUserProfile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout User
export const logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};



export const forgotPassword = async (req, res) => {
    res.status(200).json({ success: true, message: 'Forgot Password' });
};