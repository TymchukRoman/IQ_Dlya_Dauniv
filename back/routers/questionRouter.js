var express = require('express')
var router = express.Router()
const Question = require('../models/question')
const PendQuestion = require('../models/pendQuestion')
const User = require('../models/user')
const questionValidation = require('../validators/questionValidation')
const addQuestion = require('../middleware/addQuestion')
const logger = require('../utils/logger');
const admin = require("../middleware/admin");

router.get('/getQuestions', async (req, res) => {
	try {
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
	} catch (err) {
		logger("Error", "Get questions error", "/getQuestions", { err });
	}
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

	try {
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
	} catch (err) {
		logger("Error", "Add questions error", "/addQuestion",
			{
				err, user, qText: req.body.qText,
				rightAnswer: req.body.rigthAnswer, answerList: req.body.answerList,
			}
		);
	}
})

//admin route
router.post("/approveQuestion", addQuestion, async (req, res) => {
	let user = await User.findOne({ _id: req.user.user_id })
	let questionId = req.body.questionId;
	try {
		if (user && user.type === "admin") {
			let forPend = await PendQuestion.findOne({ _id: questionId })
			if (!forPend) {
				res.send({ err: "Seems like this question is not awailable" })
				return
			}
			let question = new Question({
				qText: forPend.qText,
				rigthAnswer: forPend.rigthAnswer,
				answerList: forPend.answerList,
				author: forPend.author,
				date: forPend.date,
				approvedBy: { nickname: user.nickname, id: user._id },
				approvedDate: new Date(Date.now()).toISOString(),
			})

			const savedQ = await question.save()
			await PendQuestion.deleteOne({ _id: questionId })
			res.send(savedQ)
			return
		} else {
			await logger("Warning", "Access denied", "/getPendQuestions", { user });
			res.send({ err: "You must be an administrator to aprove questions" })
			return
		}
	} catch (err) {
		logger("Error", "Approve questions error", "/approveQuestion", { err, user, questionId });
	}
})

//admin route
router.post("/getPendQuestions", addQuestion, async (req, res) => {
	let user = await User.findOne({ _id: req.user.user_id })
	try {
		if (user && user.type === "admin") {
			await PendQuestion.find({}, (err, found) => {
				if (!found) {
					return res.send({ pendQuestions: [], msg: "No pend questions" });
				} else {
					return res.send({ pendQuestions: [...found] });
				}
			})
		} else {
			await logger("Warning", "Access denied", "/getPendQuestions", { user });
			res.send({ err: "You must be an administrator to see pending questions" })
			return
		}
	} catch (err) {
		logger("Error", "Approve questions error", "/approveQuestion", { err, user });
	}
})

//admin route
router.post("/findQuestions", admin, async (req, res) => {
	try {
		await Question.findOne({ _id: req.body.id }, (err, found) => {
			if (!found || err) {
				return res.send({ err, msg: "No found questions" })
			} else {
				return res.send({ found })
			}
		})
	} catch (err) {
		logger("Error", "Cannot find question", "/findQuestions", { err, user: req.user, id: req.body.id });
	}
})

//admin route
router.post("/getAllQuestions", admin, async (req, res) => {
	try {
		await Question.find({}, (err, found) => {
			if (!found || err) {
				return res.send({ err, msg: "No found questions" })
			} else {
				return res.send({ found })
			}
		})
	} catch (err) {
		logger("Error", "Cannot get all questions", "/getAllQuestions", { err, user: req.user });
	}
})

//admin route
router.post("/updateQuestion", admin, async (req, res) => {
	try {
		await Question.findOneAndUpdate({ _id: req.body.id },
			{ ...req.body.newdata }, { new: true }, (err, doc) => {
				if (err) {
					return res.send({ err })
				}
				return res.send({ doc })
			})
	} catch (err) {
		logger("Error", "Cannot update question", "/updateQuestion", { err, user: req.user, id: req.body.id, new: req.body.newData });
	}
})

//admin route
router.post("/deleteQuestion", admin, async (req, res) => {
	try {
		await Question.deleteOne({ _id: req.body.id }, {}, (err) => {
			if (err) {
				return res.send({ err })
			}
			return res.send({ msg: "Question deleted" })
		})
	} catch (err) {
		logger("Error", "Cannot delete question", "/deleteQuestion", { err, user: req.user, id: req.body.id });
	}
})

module.exports = router
