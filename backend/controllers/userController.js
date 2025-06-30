import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
}

const userRegister = async (req, res) => {

    try {
        // check if user already exists
        const { name, email, password } = req.body;
        const exits = await userModel.findOne({ email });
        if (exits) {
            return res.json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // create user
        const newUser = new userModel({
            name,
            email,
            password: hashPassword,
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }


}


const userLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        // check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }
        else {
            const token = createToken(user._id);
            return res.json({
                success: true,
                token
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}


const admindLogin = async (req, res) => {


}

export { userLogin, userRegister, admindLogin };