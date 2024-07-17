import express from 'express';
const router = express.Router();

import * as pageController from '../controllers/pageController.js';
import redirectMiddleware from '../middlewares/redirectMiddleware.js';

router.route('/').get(pageController.getIndexpage);
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendEmail);
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);

export default router;
