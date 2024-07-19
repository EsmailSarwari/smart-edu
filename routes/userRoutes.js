import express from 'express';
import { body } from 'express-validator';
const Router = express.Router();
import * as userController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import User from '../models/userModel.js';

Router.route('/singup').post(
    [
        body('name').not().isEmpty().withMessage('Please enter your name!'),
        body('email').isEmail().withMessage('Please enter a valid email address!')
            .custom(async (userEmail) => {
                return await User.findOne({ email: userEmail }).then((user) => {
                    if (user) {
                        return Promise.reject('Email address already exist!');
                    }
                });
            }),
        body('password').not().isEmpty().withMessage('Please enter a valid password!'),
    ],
    userController.createUser
);
Router.route('/login').post(userController.loginUser);
Router.route('/logout').get(userController.logOutUser);
Router.route('/dashboard').get(authMiddleware, userController.getDashboardPage);
Router.route('/:id').delete(userController.deleteUser);

export default Router;
