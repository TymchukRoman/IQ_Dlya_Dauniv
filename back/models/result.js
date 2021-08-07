const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }

}, { collection: 'results' })

module.exports = mongoose.model("result", resultSchema);