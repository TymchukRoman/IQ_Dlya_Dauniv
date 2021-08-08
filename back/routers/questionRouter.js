var express = require('express');
var router = express.Router();
const Question = require('../models/question');
const questionValidation = require('../validators/questionValidation');

router.get('/getQuestions', async (req, res) => {
    let idArray = [];
    let qArray = [];
    await Question.find({}, (err, found) => {
        if (!found) {
            res.status(404).json({ err });
            return;
        } else {
            idArray = found.map((item) => {
                return item._id
            })
        }
    })
    Promise.all(getArray(idArray.length - 1).map(async (index) => {

        let result = await getById(idArray[index])

        qArray.push({
            answerList: result.answerList,
            _id: result._id,
            qText: result.qText,
            author: result.author,
        })
    })).then(() => {
        res.send({ data: [...qArray] })
        return
    })
})

const getById = async (id) => {
    let result;
    await Question.find({ _id: id }, (err, found) => {
        if (!found) {
            result = null;
        } else {
            result = found[0];
        }
    })
    if (!result) {
        result = await getById(id)
    }
    return result
}

const getArray = (max) => {
    let arr = []
    for (let i = 0; i < 10; i++) {
        let random = Math.round(Math.random() * max);
        if (arr.includes(random)) {
            i--;
            continue;
        }
        arr[i] = random;
    }
    return arr;
}

router.post('/addQuestion', async (req, res) => {
    let err = questionValidation(req.body.qText, req.body.rigthAnswer, req.body.answerList);
    if (err.length > 0) {
        res.send(err)
        return
    }
    if (isAdmin(req.body.login, req.body.password)) {
        const question = new Question({
            qText: req.body.qText,
            rigthAnswer: req.body.rigthAnswer,
            answerList: [...req.body.answerList],
            author: req.body.login,
            date: new Date(Date.now()).toISOString(),
        });
        const savedQ = await question.save();
        res.send(savedQ);
        return;
    }
    res.send("Wrong login or password")
    return;
})

const isAdmin = (login, password) => {
    admins = [
        {
            login: "RomanT",
            password: "admin"
        },
        {
            login: "RomanI",
            password: "admin"
        },
    ]
    const founded = admins.filter(user => user.login == login)
    if (!founded[0]) {
        return false
    }
    if (founded[0].password == password) {
        return true
    }
    return false
}

module.exports = router
