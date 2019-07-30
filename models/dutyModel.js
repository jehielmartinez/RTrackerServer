const mongoose = require('mongoose')

let dutySchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    quarter: {
        type: String,
        trim: true
    },
    month: {
        type: String,
        trim: true
    }
})

const Duty = mongoose.model('Duty', dutySchema)

module.exports = Duty