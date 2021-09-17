const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
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
    approvedBy: {
      type: Object,
      required: true,
    },
    approvedDate: {
      type: String,
      required: true,
    },
    lastUpdatedBy: {
      type: String,
      required: false,
    },
    lastUpdateDate: {
      type: String,
      required: false,
    },
  },
  { collection: 'questions' },
)

module.exports = mongoose.model('question', questionSchema)
