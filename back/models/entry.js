const mongoose = require("mongoose")

const entrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },

}, { collection: 'entries' })

module.exports = mongoose.model("entry", entrySchema);