import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //fetch all users
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //user signup
    const { name, email, password } = req.body; //Seperate the variables

    //User email (user) must not be there, duplicate
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered.");

    //Hash the password first
    const hashedPassword = await hash(password, 10);
    //Create new user with details and bcrypte password
    const user = new User({ name, email, password: hashedPassword });

    //Save the user
    await user.save();

    //Clear previous cookies
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    //Initiate the jwt token using user details
    const token = createToken(user._id.toString(), user.email, "1d");

    //Set the expires date
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    //Initiate cookie and attach it to response
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: "OK", email: user.email, name: user.name });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //user login
    const { email, password } = req.body; //Seperate the variables

    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered.");
    }

    //Check for password
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    //Clear previous cookies
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    //Initiate the jwt token using user details
    const token = createToken(user._id.toString(), user.email, "1d");

    //Set the expires date
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    //Initiate cookie and attach it to response
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", email: user.email, name: user.name });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //find user by email in jwt data
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("User not registered or Token malfunctioned.");
    }
    console.log(user._id.toString(), res.locals.jwtData.id);
    //Verify the email of the user and the token
    if (user._id.toString() === res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't match.");
    }
    return res
      .status(200)
      .json({ message: "OK", email: user.email, name: user.name });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
