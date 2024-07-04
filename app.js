import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000;

// route controllers
import pageRoutes from './routes/pageRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

// db connection
mongoose
    .connect('mongodb://localhost/smartedu-db')
    .then(console.log('DB connected successfully'))
    .catch(console.error());

// template engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(urlencoded({ extended: true }));

// routes
app.use('/', pageRoutes);
app.use('/courses', courseRoutes);

app.listen(port, () => {
    console.log(`App is running on server ${port}`);
});
