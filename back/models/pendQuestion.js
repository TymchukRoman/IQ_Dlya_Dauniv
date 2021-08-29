const mongoose = require('mongoose')

const pendQuestionSchema = new mongoose.Schema(
  {
    qText: {
      type: String,
      required: true,
    },
    rigthAnswer: {
      type: String,
      required: true,
    },
    answerList: {
      type: Array,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { collection: 'pendQuestions' },
)

module.exports = mongoose.model('pendQuestion', pendQuestionSchema)
