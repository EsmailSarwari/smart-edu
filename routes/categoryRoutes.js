import express from 'express';
const router = express.Router();

import * as categoryController from '../controllers/categoryController.js';

router.route('/').post(categoryController.createCategory);
router.route('/:id').delete(categoryController.deleteCategory);
router.route('/:id').put(categoryController.updateCategory);

export default router;
