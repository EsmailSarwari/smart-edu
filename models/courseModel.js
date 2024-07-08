import { Schema, model } from 'mongoose';
import slugify from 'slugify';

const courseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
    slug: {
        type: String,
        unique: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categoryModel',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userModel'
    },
});

courseSchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
    });
    next();
});

const Course = model('course', courseSchema);

export default Course;
