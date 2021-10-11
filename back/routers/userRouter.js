var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const loginValidation = require('../validators/loginValidation');
const registerValidation = require("../validators/registerValidation");
const logger = require('../utils/logger');
const admin = require("../middleware/admin");

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
                { user_id: user._id, email, role: user.type },
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
            { user_id: user._id, email, role: user.type },
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

router.post("/findUser", admin, async (req, res) => {
    try {
        await User.findOne({ email: req.body.email }, (err, found) => {
            if (!found) {
                res.send({ err });
                return;
            } else {
                res.send({ found });
                return
            }
        })
    } catch (err) {
        logger("Error", "Cannot find user", "/findUser", { user: req.user, err, userId: req.body.id });
    }
})

router.post("/promoteUser", admin, async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.body.id }, { type: "admin" }, {}, (err, doc) => {
            if (err) {
                return res.send({ err })
            }
            logger("Info", "User promoted", "/promoteUser", { promotor: req.user, promoted: req.body.id });
            return res.send({ msg: "User propoted" })
        })
    } catch (err) {
        logger("Error", "AUser promotion error", "/promoteUser", { user: req.user, err, userId: req.body.id });
    }
})


router.post("/demoteUser", admin, async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.body.id }, { type: "user" }, {}, (err, doc) => {
            if (err) {
                return res.send({ err })
            }
            logger("Info", "User demoted", "/demoteUser", { demotor: req.user, demoted: req.body.id });
            return res.send({ msg: "User demoted" })
        })
    } catch (err) {
        logger("Error", "User demotion error", "/demoteUser", { user: req.user, err, userId: req.body.id });
    }
})


router.post("/banUser", admin, async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.body.id }, { type: "banned" }, {}, (err, doc) => {
            if (err) {
                return res.send({ err })
            }
            logger("Info", "User baned", "/banUser", { admin: req.user, user: req.body.id });
            return res.send({ msg: "User propoted" })
        })
    } catch (err) {
        logger("Error", "User ban error", "/banUser", { user: req.user, err, userId: req.body.id });
    }
})

module.exports = router
