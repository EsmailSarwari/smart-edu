import Course from '../models/Course.js';

export const createCourse = async (req, res) => {
    const courses = await Course.create(req.body);
    try {
        res.status(201).json({
            status: Success,
            courses,
        });
    } catch (error) {
        res.status(400).json({
            status: Fail,
            error,
        });
    }
};
