import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }
        const isUserPresent = await User.findOne({ email });
        if (isUserPresent) {
            throw new Error("User already exist");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            successful: true,
            message: "Account created successfully",
        });
    } catch (err) {
        res.status(400).json({ successful: false, error: err.message });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("All fields are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordMatch = await user.validatePassword(password);
        if (!isPasswordMatch) {
            throw new Error("Invalid credentials");
        }
        const token = await user.getJWT();
        res.status(200)
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            })
            .json({ successful: true, message: "Login successful", user });
    } catch (err) {
        res.status(400)
            .cookie("token", null, { expires: new Date(0) })
            .json({
                successful: false,
                message: "Login failed",
                error: err.message,
            });
    }
};

export const Logout = async (req, res) => {
    try {
        res.status(200)
            .cookie("token", null, {
                expires: new Date(0),
                httpOnly: true,
                sameSite: "strict",
            })
            .json({ successful: true, message: "Successfully logged out" });
    } catch (err) {
        res.status(400).json({ successful: false, error: err.message });
    }
};

export const Profile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res
                .status(401)
                .json({ successful: false, error: "Unauthorized" });
        }
        res.status(200).json({ successful: true, user });
    } catch (err) {
        res.status(400).json({ successful: false, error: err.message });
    }
};

export const UpdateProfile = async (req, res) => {
    try {
        const {name} = req.body;
        const photo = req.file;
        const user = req.user;
        if (!user) {
            return res
                .status(401)
                .json({ successful: false, error: "Unauthorized" });
        }

        const updatedUser = {name, photoUrl};
    } catch (error) {
        res.status(400).json({ successful: false, error: err.message });
    }
}