const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }
}, { collection: 'categories' })

module.exports = mongoose.model("category", categorySchema);