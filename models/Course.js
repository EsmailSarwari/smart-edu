import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Course = model('course', courseSchema);

export default Course;
