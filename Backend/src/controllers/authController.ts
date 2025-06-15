import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '2h'});
}

export const registerUser = async (req, res) => {
    const {name,email,password,profileImageUrl}= req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try{
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        const user = await User.create({
            name,
            email,
            password,
            profileImageUrl
        });
        console.log("User created:", user);
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({
            message: "Error registering user",
            error: err.message
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

export const getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching user info",
            error: err.message
        });
    }
};