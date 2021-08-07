const express = require('express');
const router = express.Router();
const Result = require('../models/result');
const Question = require('../models/question');
const User = require('../models/user');
const auth = require("../middleware/auth");
const answerValidation = require('../validators/answerValidation');

router.post('/checkResult', auth, async (req, res) => {
    let err = answerValidation(req.body.answers);
    if (err.length > 0) {
        res.send(err)
        return
    }
    let points = 0;
    Promise.all(req.body.answers.map(async (answer) => {
        await Question.findOne({ _id: answer.id }, (err, found) => {
            if (!found) {
                console.log({ err });
            } else {
                if (found.rigthAnswer === answer.answer) {
                    points++;
                    return 1;
                }
                return 1;
            }
        })
    })).then(async () => {
        const testResult = new Result({
            userId: req.user.user_id,
            questions: [...req.body.answers],
            points: points + "/" + req.body.answers.length,
            date: new Date(Date.now()).toISOString(),
        });
        const savedR = await testResult.save();
        res.send(savedR._id);
        return
    })
})

router.get('/getResults', (req, res) => {
    Result.find({}, (err, found) => {
        if (!found) {
            res.status(404).json({ err });
            return;
        } else {
            res.send(found);
            return
        }
    })
})

router.post('/getResult', (req, res) => {
    Result.findOne({ _id: req.body.id }, (err, found) => {
        if (!found) {
            res.status(404).json({ err });
            return;
        } else {
            res.send({
                userId: found.userId,
                questions: [...found.questions],
                points: found.points,
                date: found.date
            });
            return
        }
    })
})

module.exports = router
