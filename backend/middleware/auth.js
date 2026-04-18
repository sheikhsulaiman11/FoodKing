import { isTokenValid } from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401);
        throw new Error('Unauthorized: No token provided');
    }

    const payload = isTokenValid(token, process.env.JWT_SECRET);

    if (!payload) {
        res.status(401);
        throw new Error('Unauthorized: Invalid token');
    }

    const { username, userId, role } = payload;

    // _id is what all your controllers use
    req.user = { _id: userId, userId, role };

    console.log(`Authenticated User: ${username}, ID: ${userId}, Role: ${role}`);

    next();
});

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`Access denied for role: ${req.user.role}`);
        }
        next();
    };
};

export { protect, authorizeRoles };