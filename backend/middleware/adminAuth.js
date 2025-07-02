import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔍 Decoded Token:", decoded);
        console.log("✅ Expecting:", process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);


        if (decoded.id !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }


        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
export default adminAuth;