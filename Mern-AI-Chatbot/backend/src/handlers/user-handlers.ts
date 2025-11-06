import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, password } = req.body;

        //Validating new User
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(401).json({ message: "User already registered" });
        }

        //Password Encryption
        const hashedPassword = await bcrypt.hash(password, 10);

        //Signed up new user
        const user = new User({ name, email, password:hashedPassword});
        await user.save();
        return res.status(201).json({ message: "Signed Up", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}