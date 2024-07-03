import express from 'express';
const Routes = express.Router();

import * as courseController from '../controllers/courseController.js';

Routes.route('/').post(courseController.createCourse);

export default Routes;
