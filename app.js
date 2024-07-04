import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
const app = express();

// route controllers
import pageRoutes from './routes/pageRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

// db connection
const port = process.env.PORT || 3000;
const mongodb_uri = process.env.MONGODB_URI;
mongoose
    .connect(mongodb_uri)
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
app.use('/categories', categoryRoutes); 

app.listen(port, () => {
    console.log(`App is running on server ${port}`);
});
