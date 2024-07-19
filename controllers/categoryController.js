import Category from '../models/categoryModel.js';

export const createCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            req.flash('error', `Category Name required`);
            return res.status(400).redirect('/users/dashboard');
        }
        const category = await Category.create(req.body);
        req.flash(
            'success',
            `${category.name}, category has been created successfully`
        );
        return res.status(201).redirect('/users/dashboard');
    } catch (error) {
        console.error(`Error occurred creating category: ${error}`);
        req.flash('error', 'Creation unsuccessful');
        return res.status(500).redirect('/users/dashboard');
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        req.flash('success', `${category.name} has been deleted successfully`);
        return res.status(200).redirect('/users/dashboard');
    } catch (error) {
        console.error(`Error occurred while deleting category: ${error}`);
        req.flash('error', 'Deletion unsuccessful');
        return res.status(500).redirect('/users/dashboard');
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

        req.flash('success', `${category.name} Updated successfully`);
        return res.status(200).redirect('/users/dashboard');
    } catch (error) {
        console.error(`Error occurred while updating category: ${error}`);
        req.flash('error', 'Update unsuccessful');
        return res.status(500).redirect('/users/dashboard');
    }
};
