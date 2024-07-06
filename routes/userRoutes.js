import express from 'express';
const Router = express.Router();
import * as userController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

Router.route('/singup').post(userController.createUser);
Router.route('/login').post(userController.loginUser);
Router.route('/logout').get(userController.logOutUser);
Router.route('/dashboard').get(authMiddleware, userController.getDashboardPage);

export default Router;
