const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    addedQ: {
        type: Array,
        required: true,
    }
}, { collection: 'admins' })

module.exports = mongoose.model("admin", adminSchema);