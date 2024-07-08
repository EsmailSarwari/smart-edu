import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Category from '../models/Category.js';

export const createUser = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.password ||
            !req.body.role
        ) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Please fill out all the options',
            });
        }
        const user = await User.create(req.body);
        res.status(201).redirect('/login');
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                status: 'Fail',
                message: 'Validation error',
                details: error.errors,
            });
        }
        res.status(400).json({
            status: 'Error',
            message: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Please fill out all the options',
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Invalid email or password',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Invalid email or password',
            });
        }

        // Start session for the user
        req.session.userID = user._id;

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        // Handle different types of errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                status: 'Fail',
                message: 'Validation error',
                details: error.errors,
            });
        }
        res.status(500).json({
            status: 'Error',
            message: 'An error occurred during login',
            details: error.message,
        });
    }
};

export const logOutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

export const getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID });
    const categories = await Category.find();
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
    });
};
