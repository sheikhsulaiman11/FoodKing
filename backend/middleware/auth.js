import { isTokenValid } from '../utils/generateToken&SetToken.js';




const ProtectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const payload = isTokenValid(token, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const { name, userId, role } = payload;
    req.user = { userId, role };

    console.log(`Authenticated User: ${name}, ID: ${userId}, Role: ${role}`);

    next();
  } catch (error) {
    console.error("ProtectedRoute Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json(`{message: 'Access denied for role': ${req.user.role} }`);
    }
    next();
  };
};

export { ProtectedRoute, authorizeRoles };