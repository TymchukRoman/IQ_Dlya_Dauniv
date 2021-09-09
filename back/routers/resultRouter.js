const express = require('express');
const router = express.Router();
const Result = require('../models/result');
const Question = require('../models/question');
const User = require('../models/user');
const auth = require("../middleware/auth");
const answerValidation = require('../validators/answerValidation');
const logger = require('../utils/logger');

router.post('/checkResults', auth, async (req, res) => {
    try {
        let err = answerValidation(req.body.answers);
        if (err.length > 0) {
            res.send({ err })
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
                points: points,
                date: new Date(Date.now()).toISOString(),
            });
            writeUserResult(testResult.points, testResult._id, req.user.user_id)
            const savedR = await testResult.save();
            res.send({resultId: savedR._id});
            return
        })
    } catch (err) {
        logger("Error", "Check result error", "/checkResults", { answers: req.body.answers, user: req.user._id, err });
    }
})

const writeUserResult = async (points, resultId, user_id) => {
    let user = await User.findOne({ _id: user_id });
    let results = [...user.results]
    let score = user.totalScore
    await User.updateOne({ _id: user_id }, { results: [...results, resultId], totalScore: (score + points) });
    return
}

router.get('/getResults', (req, res) => {
    try {
        Result.find({}, (err, found) => {
            if (!found) {
                res.send({ err });
                return;
            } else {
                res.send(found);
                return
            }
        })
    } catch (err) {
        logger("Error", "Get results error", "/getResults", { err });
    }
})

router.post('/getResult', (req, res) => {
    try {
        Result.findOne({ _id: req.body.resultId }, (err, found) => {
            if (!found) {
                res.send({ err });
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
    } catch (err) {
        logger("Error", "Get result error", "/getResult", { err, id: req.body.resultId });
    }
})

router.get('/getLeaderboards', async (req, res) => {
    try {
        let resultList
        await User.find({}, (err, found) => {
            if (!found) {
                res.send({ err });
                return;
            } else {
                resultList = found.map(user => {
                    return { totalScore: user.totalScore, userId: user._id }
                });
                return
            }
        })
        let infoList = []
        Promise.all(calcTop(resultList).map(async (item) => {
            let name
            await User.findOne({ _id: item.userId }, (err, found) => {
                if (!found) {
                    name = "Deleted user"
                    return;
                } else {
                    name = found.nickname
                    return
                }
            })
            infoList.push({
                name: name,
                points: item.totalScore
            })
        })).then(() => {
            res.send({ top: infoList })
        })
    } catch (err) {
        logger("Error", "Get leaderboards error", "/getLeaderboards", { err });
    }
})

const calcTop = (list) => {
    let sorted = list.sort((a, b) => b.totalScore - a.totalScore);
    let top = [];
    for (let i = 0; i < 3; i++) {
        sorted[i] && top.push(sorted[i])
    }
    return top
}

module.exports = router
