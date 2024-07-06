import User from '../models/User.js';

const redirectMiddleware = (req, res, next) => {
    if (req.session.userID) {
        return res.redirect('/');
    }
    next();
};

export default redirectMiddleware;
