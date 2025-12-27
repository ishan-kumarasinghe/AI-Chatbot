import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../libs/jwt-token-generator.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //Validating new User
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User already registered" });
        }
        //Password Encryption
        const hashedPassword = await bcrypt.hash(password, 10);
        //Signed up new user
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: "Signed Up", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Validating User by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not registered." });
        }
        //Validate Encrypted password
        const isPasswordCorrect = bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password." });
        }
        //Create Token
        const token = createToken(user.id.toString(), user.email, "1h");
        //Calculate the expiration time of the cookie
        const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
        //Clear previous cookies first
        res.clearCookie("jwt_token");
        res.cookie("jwt_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            sameSite: "none",
        });
        return res.status(200).json({ message: "Logged in successfully", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
//# sourceMappingURL=user-handlers.js.map