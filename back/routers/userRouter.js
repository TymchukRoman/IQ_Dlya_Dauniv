var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const loginValidation = require('../validators/loginValidation');
const registerValidation = require("../validators/registerValidation");
const logger = require('../utils/logger');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let err = loginValidation(email, password);
        if (err.length > 0) {
            res.send({ err })
            return
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_SECRET,
                { expiresIn: "2h", }
            );
            res.send({
                nickname: user.nickname,
                totalScore: user.totalScore,
                results: user.results,
                type: user.type,
                token
            });
            return
        }
        res.send({ err: "Invalid Credentials" });
        return
    } catch (err) {
        logger("Error", "Login error", "/login", { email, password, err });
    }
})

router.post('/register', async (req, res) => {
    const { nickname, age, email, password } = req.body;
    try {
        let err = registerValidation(nickname, age, password, email);
        if (err.length > 0) {
            res.send({ err })
            return
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            res.send({ err: "User Already Exist. Please Login" });
            return
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            nickname,
            age,
            password: encryptedPassword,
            email,
            results: [],
            type: "user",
            totalScore: 0
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        );
        user.token = token;
        const savedUser = await user.save();
        logger("Info", "New user registered", "/register", savedUser)
        res.send({ token });
        return;
    } catch (err) {
        logger("Error", "Registration error", "/register", { nickname, age, email, password, err });
    }
})

router.post("/me", auth, async (req, res) => {
    try {
        const userId = await req.user.user_id;
        const user = await User.findOne({ _id: userId });
        res.send({
            nickname: user.nickname,
            totalScore: user.totalScore,
            results: user.results,
            type: user.type
        });
        return
    } catch (err) {
        logger("Error", "Authentication error", "/me", { userId: req.user.user_id, err });
    }
})

module.exports = router
