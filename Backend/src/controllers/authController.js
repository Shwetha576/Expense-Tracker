const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '2h'});
}

exports.registerUser = async (req, res) => {
    const {name,email,password,profileImageUrl}= req.body;

    if(!name || !email || !password) {
        return res.status(400).json({message: "Please fill all the fields"});
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
        res.status(201).json({
            id: user.__id,
            user,
            token: generateToken(user._id)
        });
    } catch (err) {
        res.status(500).json({
            message: "Error registering user",
            error: err.message
        });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
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

exports.getUserInfo = async (req, res) => {
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