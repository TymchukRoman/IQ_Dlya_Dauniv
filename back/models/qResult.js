const mongoose = require('mongoose')

const qResultSchema = new mongoose.Schema(
    {
        qText: {
            type: String,
            required: true,
        },
        qId: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        timeSpent: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        }
    },
    { collection: 'qResults' },
)

module.exports = mongoose.model('qResult', qResultSchema)
