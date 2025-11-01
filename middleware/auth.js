
// import jwt from "jsonwebtoken";


// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers;
//     if(!token){
//       return res.status(400).json({ message: "User not found" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export default authMiddleware;

















import jwt from "jsonwebtoken";

// 1. Authentication Middleware (Verify Token)
export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.token; 

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized: Token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Contains { id, role }
        
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Not Authorized: Invalid or expired token" });
    }
};

// 2. Authorization Middleware (Verify Role)
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: Role (${req.user.role}) is not allowed to access this resource`
            });
        }
        next();
    };
};