var express = require('express')
var router = express.Router()
const Question = require('../models/question')
const PendQuestion = require('../models/pendQuestion')
const User = require('../models/user')
const questionValidation = require('../validators/questionValidation')
const addQuestion = require('../middleware/addQuestion')

router.get('/getQuestions', async (req, res) => {
  let idArray = []
  let qArray = []
  await Question.find({}, (err, found) => {
    if (!found) {
      res.send({ err })
      return
    } else {
      idArray = found.map((item) => {
        return item._id
      })
    }
  })
  Promise.all(
    getArray(idArray.length - 1).map(async (index) => {
      let result = await getById(idArray[index])

      qArray.push({
        answerList: result.answerList,
        _id: result._id,
        qText: result.qText,
        author: result.author,
      })
    }),
  ).then(() => {
    res.send({ questions: [...qArray] })
    return
  })
})

const getById = async (id) => {
  let result
  await Question.find({ _id: id }, (err, found) => {
    if (!found) {
      result = null
    } else {
      result = found[0]
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
    let random = Math.round(Math.random() * max)
    if (arr.includes(random)) {
      i--
      continue
    }
    arr[i] = random
  }
  return arr
}

router.post('/addQuestion', addQuestion, async (req, res) => {
  const user = await User.findOne({ _id: req.user.user_id })

  let err = questionValidation(
    req.body.qText,
    req.body.rigthAnswer,
    req.body.answerList,
  )

  if (err.length > 0) {
    res.send({ err })
    return
  }

  if (user.type === 'admin') {
    const question = new Question({
      qText: req.body.qText,
      rigthAnswer: req.body.rigthAnswer,
      answerList: [...req.body.answerList],
      author: user.nickname,
      date: new Date(Date.now()).toISOString(),
      approvedBy: { nickname: user.nickname, id: user._id },
      approvedDate: new Date(Date.now()).toISOString(),
    })
    const savedQ = await question.save()
    res.send(savedQ)
    return
  } else {
    const pendQuestion = new PendQuestion({
      qText: req.body.qText,
      rigthAnswer: req.body.rigthAnswer,
      answerList: [...req.body.answerList],
      author: user.nickname,
      date: new Date(Date.now()).toISOString(),
    })
    const savedQ = await pendQuestion.save()
    res.send(savedQ)
    return
  }
  res.send({ err: 'Cant add question' })
  return
})

module.exports = router
