import express from 'express';
const router = express.Router();

import * as courseController from '../controllers/courseController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

router.route('/').post(roleMiddleware(['admin', 'teacher']), courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);

export default router;
