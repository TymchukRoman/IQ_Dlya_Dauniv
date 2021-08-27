const express = require('express');
const router = express.Router();
const Result = require('../models/result');
const Question = require('../models/question');
const User = require('../models/user');
const auth = require("../middleware/auth");
const answerValidation = require('../validators/answerValidation');

router.post('/checkResults', auth, async (req, res) => {
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
        res.send(savedR._id);
        return
    })
})

const writeUserResult = async (points, resultId, user_id) => {
    let user = await User.findOne({ _id: user_id });
    let results = [...user.results]
    let score = user.totalScore
    await User.updateOne({ _id: user_id }, { results: [...results, resultId], totalScore: (score + points) });
    return
}

router.get('/getResults', (req, res) => {
    Result.find({}, (err, found) => {
        if (!found) {
            res.send({ err });
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
})

router.get('/getLeaderboards', async (req, res) => {
    let resultList
    await Result.find({}, (err, found) => {
        if (!found) {
            res.send({ err });
            return;
        } else {
            resultList = [...found];
            return
        }
    })
    let infoList = []
    Promise.all(calcTop(resultList).map(async (item) => {
        let name
        await User.findOne({ _id: item[0] }, (err, found) => {
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
            points: item[1]
        })
    })).then(() => {
        res.send(infoList)
    })

})

const calcTop = (list) => {
    let unsorted = [];
    list.forEach((item) => {
        let added = false
        for (i = 0; i < unsorted.length || added; i++) {
            if (unsorted[i][0] == item.userId) {
                unsorted[i][1] += item.points
                added = true
                break;
            }
        }
        if (!added) {
            unsorted.push([item.userId, item.points])
        }
    })
    unsorted.sort((a, b) => b[1] - a[1]);
    return [unsorted[0], unsorted[1], unsorted[2]]
}

module.exports = router
