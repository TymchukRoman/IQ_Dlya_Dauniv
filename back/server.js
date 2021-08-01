const express = require('express');
const mongoose = require("mongoose");
const Admin = require('./models/admin');
const Question = require('./models/question');
const Result = require('./models/result');
const bodyParser = require('body-parser');
const app = express();

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
        let result;
        await Question.find({ _id: idArray[index] }, (err, found) => {
            if (!found) {
                result = null;
            } else {
                result = found[0];
            }
        })
        qArray.push(result)
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
    if(isAdmin(req.body.login, req.body.password)){
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
    if(!founded[0]){
        return false
    }
    if(founded[0].password == password) {
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
        res.send(savedR);
    })

})

///Check and add Result end

app.get('/getResults', (req, res) => {
    Result.find({}, (err, found) => {
        if (!found) {
            res.status(404).json({ err });
            return;
        } else {
            res.send({ data: found });
        }
    })
})

app.post('/addAdmin', (req, res) => {
    verifyAdmin(req.body.login, req.body.password)
})

const addResult = async (req, res) => {
    const result = new Result({
        nickname: req.body.nickname,
        questions: [...req.body.questions],
        points: req.body.points,
        date: new Date(Date.now()).toISOString()
    });
    const savedResult = await result.save();
    res.send(savedResult)
}

app.post('/check', (req, res) => {

})

const verifyAdmin = (login, password) => {
    return true
}

// app.get('/getEntries', (req, res) => {
//     Entry.find({}, (err, found) => {
//         if (!found) {
//             res.status(404).json({ err });
//             return;
//         } else {
//             res.send({ data: found });
//         }
//     })
// });

// app.get('/getCategories', (req, res) => {
//     Category.find({}, (err, found) => {
//         if (!found) {
//             res.status(404).json({ err });
//             return;
//         } else {
//             res.send({ data: found });
//         }
//     })
// });

// app.post("/searchTags", async (req, res) => {
//     let tags = req.body.tags;
//     if (!req.body.tags || req.body.tags.length < 1) {
//         Entry.find({}, (err, found) => {
//             if (!found) {
//                 res.status(404).json({ err });
//                 return;
//             } else {
//                 res.send({ data: found });
//                 return;
//             }
//         })
//     }
//     if (req.body.tags) {
//         tags = req.body.tags.map((tag) => {
//             return { tags: tag }
//         })
//     }
//     if (tags.length > 0) {
//         data = await Entry.find({
//             $and: tags
//         }, (err, found) => {
//             if (!found) {
//                 res.status(404).json({ err })
//                 return;
//             } else {
//                 res.json({ data: found })
//             }
//         })
//     }
// })

// app.post("/searchTitle", async (req, res) => {
//     Entry.find({
//         "title": { "$regex": req.body.titlePart, "$options": "i" }
//     }, (err, found) => {
//         if (!found) {
//             res.status(404).json({ err })
//             return;
//         } else {
//             res.json({ data: found })
//         }
//     })
// })

// app.post("/getOne", async (req, res) => {
//     Entry.findOne({ _id: req.body.id }, (err, found) => {
//         if (!found) {
//             res.status(404).json({ err })
//             return;
//         } else {
//             res.json({ data: found })
//         }
//     })
// })

// app.post("/addEntry", async (req, res) => {
//     req.body.tags.map((tag) => {
//         Category.findOne({ title: tag }, (err, found) => {
//             if (!found) {
//                 const cate = new Category({
//                     title: tag
//                 })
//                 cate.save();
//             }
//         })
//     })
//     const entry = new Entry({
//         title: req.body.title,
//         tags: req.body.tags,
//         data: req.body.data,
//         date: new Date(Date.now()).toISOString()
//     });
//     const savedEntry = await entry.save();
//     res.send(savedEntry)
// })

// app.post('/deleteEntry', (req, res) => {
//     console.log(req.body.id)
//     Entry.deleteOne({ _id: req.body.id }, (err) => {
//         if (!err) {
//             console.log('entry deleted');
//             checkCategories();
//         }
//         else {
//             res.send('error');
//         }
//     });
// });

// const checkCategories = async () => {
//     const cates = await Category.find({}, (err, found) => {
//         if (!found) {
//             console.log({ err });
//             return;
//         } else {
//             return found
//         }
//     })
//     cates.forEach(async (cate) => {
//         let entries = [];
//         entries = await Entry.find({
//             tags: cate.title
//         }, (err, found) => {
//             if (!found) {
//                 console.log({ err })
//                 return;
//             }
//         })
//         if (entries.length < 1) {
//             Category.deleteOne({ _id: cate._id }, (err) => {
//                 if (!err) {
//                     console.log('cate deleted');
//                 }
//                 else {
//                     console.log('error');
//                 }
//             });
//         }
//     })
// }

app.listen(4000, () => console.log(`Listening on port 4000`));