import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

const generateTokenandSetCookie = (res, userId) => {
    const token = jwt.sign({ id: userId }, secret, {
        expiresIn: '7d',
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return token;
};

export default generateTokenandSetCookie;