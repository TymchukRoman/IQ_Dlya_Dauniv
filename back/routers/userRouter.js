var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const loginValidation = require('../validators/loginValidation');
const registerValidation = require("../validators/registerValidation")

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let err = loginValidation(email, password);
    if (err.length > 0) {
        res.send(err)
        return
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "2h",
            }
        );
        res.status(200).json({
            nickname: user.nickname,
            totalScore: user.totalScore,
            results: user.results,
            token
        });
        return
    }
    res.status(400).send("Invalid Credentials");
    return
})

router.post('/register', async (req, res) => {
    const { nickname, age, email, password } = req.body;
    let err = registerValidation(nickname, age, password, email);
    if (err.length > 0) {
        res.send(err)
        return
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
        res.status(409).send("User Already Exist. Please Login");
        return
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        nickname,
        age,
        password: encryptedPassword,
        email,
        results: [],
        totalScore: 0
    });
    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_SECRET,
        { expiresIn: "2h" }
    );
    user.token = token;
    const savedUser = await user.save();
    res.json(token);
    return;
})

router.post("/me", auth, async (req, res) => {
    const userId = await req.user.user_id;
    const user = await User.findOne({ _id: userId });
    res.status(200).send(user);
    return
})

module.exports = router
