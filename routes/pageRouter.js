import express from 'express';
const Routes = express.Router();

import * as pageController from '../controllers/pageController.js';

Routes.route('/').get(pageController.getIndexpage);
Routes.route('/about').get(pageController.getAboutPage);

export default Routes;