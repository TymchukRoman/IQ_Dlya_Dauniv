const express = require('express');
const mongoose = require("mongoose");
const Admin = require('./models/admin');
const Question = require('./models/question');
const Result = require('./models/result');
const bodyParser = require('body-parser');
const app = express();
const questionValidation = require('./validators/questionValidation')

mongoose.connect("mongodb://localhost:27017/iq", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// Get question

app.get('/getQuestions', async (req, res) => {
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
        console.log("index = ",index)
        console.log(idArray[index])
        let result;
        await Question.find({ _id: idArray[index] }, (err, found) => {
            if (!found) {
                result = null;
            } else {
                result = found[0];
            }
        })
        qArray.push({
            answerList: result.answerList,
            _id: result._id,
            qText: result.qText,
            author: result.author,
        })
    })).then(() => {
        res.send({ data: [...qArray] })
    })
})

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

/// Get Question end
/// Add question

app.post('/addQuestion', async (req, res) => {
    let err = questionValidation(req.body.qText, req.body.rigthAnswer, req.body.answerList);
    if (err.length > 0){
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

/// Add question end
/// Check and add Result

app.post('/checkResult', async (req, res) => {
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
            nickname: req.body.nickname,
            questions: [...req.body.answers],
            points: points + "/" + req.body.answers.length,
            date: new Date(Date.now()).toISOString(),
        });
        const savedR = await testResult.save();
        res.send(savedR._id);
    })

})

///Check and add Result end
///Get results

app.get('/getResults', (req, res) => {
    Result.find({}, (err, found) => {
        if (!found) {
            res.status(404).json({ err });
            return;
        } else {
            res.send(found);
        }
    })
})

///Get results end
///Get single result

app.post('/getResult', (req, res) => {
    Result.findOne({_id: req.body.id}, (err, found) => {
        if (!found) {
            res.status(404).json({ err });
            return;
        } else {
            res.send({
                nickname: found.nickname,
                questions: [...found.questions],
                points: found.points,
                date: found.date
            });
        }
    })
})

app.listen(4000, () => console.log(`Listening on port 4000`));