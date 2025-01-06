import express from 'express';
import dotenv from 'dotenv';
import Database from './utils/database.js';
import authroutes from './routes/auth.js';

dotenv.config();
Database();

// Middleware
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authroutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});