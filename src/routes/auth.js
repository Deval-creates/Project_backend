const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. REGISTER ROUTE
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists or not
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        // Password hash
        //Salt is a randomly generated value added during password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new User
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// 2. LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { loginId, password } = req.body; 

        // Find user
        const user = await User.findOne({ $or: [{ email: loginId }, { username: loginId }] });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token for login session
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        res.json({ token, message: "Logged in successfully!" });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;