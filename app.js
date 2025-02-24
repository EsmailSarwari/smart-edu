import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import 'dotenv/config';

// route controllers
import pageRoute from './routes/pageRoutes.js';
import courseRoute from './routes/courseRoutes.js';
import categoryRoute from './routes/categoryRoutes.js';
import userRoute from './routes/userRoutes.js';

const app = express();

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
app.use(
    session({
        secret: 'very secret',
        resave: false,
        saveUninitialized: true,
        store: connectMongo.create({ mongoUrl: mongodb_uri }),
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

// routes
global.isUserSignedIn = null;
app.use('*', (req, res, next) => {
    isUserSignedIn = req.session.userID;
    next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

app.listen(port, () => {
    console.log(`App is running on server ${port}`);
});
