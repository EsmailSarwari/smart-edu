import Course from '../models/Course.js';
import Category from '../models/Category.js';

export const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            status: 'Success',
            course,
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error,
        });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.categories;
        let filter = {};

        if (categorySlug) {
            const category = await Category.findOne({ slug: categorySlug });

            if (!categorySlug) {
                res.status(404).json({
                    status: 'Fail',
                    message: 'Category Not Found',
                });
            }

            filter = { category: category._id };
        }
        const [courses, categories] = await Promise.all([
            Course.find(filter).sort({ dateCreated: -1 }),
            Category.find(),
        ]);

        res.status(200).render('courses', {
            courses,
            categories,
            page_name: 'courses',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Faild',
            message: error.message,
        });
    }
};

export const getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        res.status(200).render('course', {
            course,
            page_name: 'course',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Faild',
            error,
        });
    }
};
