import express from 'express';
const router = express.Router();

import * as categoryController from '../controllers/categoryController.js';

router.route('/').post(categoryController.createCategory);

export default router;
