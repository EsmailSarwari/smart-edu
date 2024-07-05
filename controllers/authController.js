import User from '../models/User.js';

export const createUser = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Please fill out all the options',
            });
        }
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'Success',
            data: {
                user,
            },
        });
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
