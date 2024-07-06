import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userID);
        if (!user) {
            return res.redirect('/login');
        }
        next();
    } catch (error) {
        return res.redirect('/login');
    }
};

export default authMiddleware;
