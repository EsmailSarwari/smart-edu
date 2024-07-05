import express from 'express';
const Router = express.Router();
import * as userController from '../controllers/authController.js';

Router.route('/singup').post(userController.createUser);

export default Router;
