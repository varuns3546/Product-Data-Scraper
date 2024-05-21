const mongoose = require('mongoose')

const Schema = mongoose.Schema

const storeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    targetSelector: {
        type: String,
        required: true
    },
    waitForSelector: {
        type: String,
        required: true
    },
    regex: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Store', storeSchema)