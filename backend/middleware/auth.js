import { isTokenValid } from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';

const protect = asyncHandler(async (req, res, next) => {
    // ✅ read from Authorization header instead of cookie
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401);
        throw new Error('Unauthorized: No token provided');
    }

    const token = authHeader.split(' ')[1]; // extract token after "Bearer "

    const payload = isTokenValid(token, process.env.JWT_SECRET);

    if (!payload) {
        res.status(401);
        throw new Error('Unauthorized: Invalid token');
    }

    const { username, userId, role } = payload;
    req.user = { _id: userId, userId, role };

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