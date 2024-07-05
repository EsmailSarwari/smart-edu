import express from 'express';
const router = express.Router();

import * as pageController from '../controllers/pageController.js';

router.route('/').get(pageController.getIndexpage);
router.route('/about').get(pageController.getAboutPage);
router.route('/dashboard').get(pageController.getDashboardPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/register').get(pageController.getRegisterPage);
router.route('/login').get(pageController.getLoginPage);

export default router;
