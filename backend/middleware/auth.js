import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1]; // lấy phần sau "Bearer"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded // hoặc _id tùy bạn đặt khi tạo token
        next();
    } catch (error) {
        console.error("❌ Invalid token:", error.message);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authUser;
