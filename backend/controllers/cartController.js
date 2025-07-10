import userModel from "../models/userModel.js";

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
    try {
        console.log("Adding to cart:", req.body);
        const userId = req.user.id;
        const { itemId, size } = req.body;

        if (!userId || !itemId || !size) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Item added to cart successfully", cartData });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Upload (update) giỏ hàng
const uploadCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId, size, quantity } = req.body;

        if (!userId || !itemId || !size || typeof quantity !== "number") {
            return res.status(400).json({ success: false, message: "Invalid input" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart uploaded successfully", cartData });
    } catch (error) {
        console.error("Error uploading cart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Lấy giỏ hàng người dùng
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error getting cart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export { addToCart, uploadCart, getCart };
