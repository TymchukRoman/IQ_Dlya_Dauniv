const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    results: {
        type: Array,
        required: false,
    },
    totalScore: {
        type: Number,
        required: false,
    },
    type: {
        type: String,
        required: true
    }
}, { collection: 'users' })

module.exports = mongoose.model("user", userSchema);