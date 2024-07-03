import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000;

mongoose
    .connect('mongodb://localhost/smartedu-db')
    .then(console.log('DB connected successfully'))
    .catch(console.error());

// route controllers
import pageRoutes from './routes/pageRouter.js';
import courseRoutes from './routes/courseRouter.js';

// template engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));

// routes
app.use('/', pageRoutes);
app.use('/course', courseRoutes);

app.listen(port, () => {
    console.log(`App is running on server ${port}`);
});
