import express from 'express';
const router = express.Router();

import * as courseController from '../controllers/courseController.js';

router.route('/').post(courseController.createCourse);
router.route('/').get(courseController.getAllCourses);

export default router;
