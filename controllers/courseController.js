import Course from '../models/courseModel.js';
import Category from '../models/categoryModel.js';
import User from '../models/userModel.js';

export const createCourse = async (req, res) => {
    try {
        await Course.create({
            ...req.body,
            user: req.session.userID,
        });
        req.flash(
            'success',
            `${req.body.name}, course has been created successfully!`
        );
        res.status(201).redirect('/users/dashboard');
    } catch (error) {
        req.flash(
            'error',
            `Error! ${req.body.name}, course couldn't be created!`
        );
        res.status(400).redirect('/users/dashboard');
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.categories;
        const searchQuery = req.query.search;
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

        if (searchQuery) {
            filter = { name: searchQuery };
        }

        if (!searchQuery && !categorySlug) {
            (filter.name = ''), (filter.category = null);
        }

        const [courses, categories] = await Promise.all([
            Course.find({
                $or: [
                    {
                        name: {
                            $regex: '.*' + filter.name + '.*',
                            $options: 'i',
                        },
                    },
                    { category: filter.category },
                ],
            }).sort({ dateCreated: -1 }),
            Category.find(),
        ]);

        // populate user to print the teacher name on courses name
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
        const user = await User.findOne({ _id: req.session.userID });
        const course = await Course.findOne({ slug: req.params.slug });
        const whichTeacher = await User.findById({ _id: course.user });

        const categories = await Category.find();
        res.status(200).render('course', {
            user,
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

export const enrollCourse = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.session.userID });
        user.courses.push({ _id: req.body.course_id });
        await user.save();

        req.flash('success', `You have successfully enrolled in the course "${req.body.course_name}".`);
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        req.flash('error', `Enrollment in the course "${req.body.course_name}" was unsuccessful.`);
        res.status(200).redirect('/users/dashboard');
    }
};

export const releaseCourse = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.session.userID });
        user.courses.pull({ _id: req.body.course_id });
        await user.save();

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'Faild',
            error: error.message,
        });
    }
};
