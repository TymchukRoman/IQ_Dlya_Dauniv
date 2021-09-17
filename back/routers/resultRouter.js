const express = require('express');
const router = express.Router();
const Result = require('../models/result');
const Question = require('../models/question');
const User = require('../models/user');
const QResult = require('../models/qResult')
const auth = require("../middleware/auth");
const answerValidation = require('../validators/answerValidation');
const logger = require('../utils/logger');
const admin = require("../middleware/admin");

router.post('/checkResults', auth, async (req, res) => {
    try {
        let err = answerValidation(req.body.answers);
        if (err.length > 0) {
            res.send({ err })
            return
        }
        let resultArray = [];
        let points = 0;
        Promise.all(req.body.answers.map(async (answer) => {
            await Question.findOne({ _id: answer.id }, (err, found) => {
                if (!found) {
                    console.log({ err });
                } else {
                    resultArray.push({
                        qText: found.qText,
                        qId: found._id,
                        answer: answer.answer,
                        timeSpent: answer.time ? answer.time : 0,
                        date: new Date(Date.now()).toISOString(),
                    })
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

            await QResult.insertMany(resultArray).catch((error) => {
                logger("Error", "Result creating error", "checkResults => QResult.insertMany", { resultArray, error, err });
            });

            return res.send({ resultId: savedR._id });
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
                    return { totalScore: user.totalScore, userId: user._id, nickname: user.nickname }
                });
                return
            }
        })
        let infoList = []
        Promise.all(calcTop(resultList).map(async (item) => {
            infoList.push({
                name: item.nickname,
                points: item.totalScore,
                userId: item.userId
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

router.post('/getStatistic', admin, async (req, res) => {
    try {
        await QResult.find({ qId: req.body.id }, (err, found) => {
            if (!found || err) {
                return res.send({ err });
            } else {
                return res.send(found);
            }
        })
    } catch (err) {
        logger("Error", "Get statistic error", "/getStatistic", { err, id: req.body.id });
    }
})

module.exports = router
