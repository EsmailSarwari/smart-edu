import Category from '../models/categoryModel.js';

export const createCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            res.status(400).json({
                status: 'Fail',
                message: 'Category Name Required',
            });
        }
        const category = await Category.create(req.body);
        res.status(201).json({
            status: 'Success',
            date: {
                category,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message,
        });
    }
};
