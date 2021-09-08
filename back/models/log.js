const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    func: {
        type: String,
        required: false,
    },
    data: {
        type: String,
        required: false,
    },
    timeStamp: {
        type: String,
        required: true,
    }
}, { collection: 'logs' })

module.exports = mongoose.model("log", logSchema);