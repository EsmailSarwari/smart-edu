import Course from '../models/courseModel.js';
import Category from '../models/categoryModel.js';
import User from '../models/userModel.js';

export const createCourse = async (req, res) => {
    try {
        await Course.create({
            ...req.body,
            user: req.session.userID,
        });
        res.status(201).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            error: error.message,
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
        const whichTeacher = await User.findById({ _id: course.user });

        const categories = await Category.find();
        res.status(200).render('course', {
            course,
            categories,
            whichTeacher,
            page_name: 'course',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Faild',
            error: error.message,
        });
    }
};
