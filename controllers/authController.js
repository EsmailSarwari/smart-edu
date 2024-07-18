import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import User from '../models/userModel.js';
import Category from '../models/categoryModel.js';
import Courses from '../models/courseModel.js';

export const createUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).redirect('/login');
    } catch (error) {
        const errors = validationResult(req);
        for (let i = 0; i < errors.array().length; i++) {
            req.flash(`${errors.array()[i].path}`, `${errors.array()[i].msg}`);
        }
        res.status(400).redirect('/register');
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            req.flash('error', 'Please fill out all fields');
            return res.status(400).redirect('/login');
        }

        const user = await User.findOne({ email });
        if (!user) {
            req.flash('error', 'User does not exist!');
            return res.status(400).redirect('/login');
        } else {
            const passMatch = await bcrypt.compare(password, user.password);
            if (!passMatch) {
                req.flash('error', 'Invalid Password!');
                return res.status(400).redirect('/login');
            }

            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
        }
    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred while logging in.');
        res.status(500).redirect('/login');
    }
};

export const logOutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

export const getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID });
    const teacherCourses = await Courses.find({ user: req.session.userID });
    const studentCourses = await Courses.find({ _id: user.courses });
    const categories = await Category.find();

    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
        teacherCourses,
        studentCourses,
    });
};
