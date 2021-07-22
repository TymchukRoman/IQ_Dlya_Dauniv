const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
    },
    points: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }

}, { collection: 'results' })

module.exports = mongoose.model("result", resultSchema);