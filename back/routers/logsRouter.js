const express = require('express');
const router = express.Router();
const Log = require('../models/log');
const admin = require("../middleware/admin");
const logger = require('../utils/logger');

router.post('/getLogs', admin, async (req, res) => {
    try {
        await Log.find({}, (err, found) => {
            if (!found) {
                res.send({ err });
                return;
            } else {
                res.send({ found });
                return
            }
        })
    } catch (err) {
        logger("Error", "Can`t get logs", "/getLogs", { user: req.user, err });
    }
})


router.post('/searchLogs', admin, async (req, res) => {
    try {
        await Log.find({ key: req.body.key }, (err, found) => {
            if (!found) {
                res.send({ err });
                return;
            } else {
                res.send({ found });
                return
            }
        })
    } catch (err) {
        logger("Error", "Search log error", "/searchLogs", { err, key: req.body.key, user: req.user });
    }
})

router.post('/clearLogs', admin, async (req, res) => {
    try {
        await Log.deleteMany({}, (err) => {
            if (err) {
                return res.send({ err })
            }
            return res.send({ msg: "Collection cleared" })
        })
    } catch (err) {
        logger("Error", "Can`t clear logs", "/clearLogs", { err, user: req.user });
    }
})

module.exports = router
