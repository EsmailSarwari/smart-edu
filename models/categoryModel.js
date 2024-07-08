import { Schema, model } from 'mongoose';
import slugify from 'slugify';

export const createCategory = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
});
createCategory.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
    });
    next();
});

const Category = model('category', createCategory);

export default Category;
