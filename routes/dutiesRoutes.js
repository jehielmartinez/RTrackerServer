const express = require('express')
const router = express.Router()
const Duty = require('../models/dutyModel')

//NEW DUTY
router.post('/new-duty', async (req, res) => {

    const duty = new Duty(req.body)

    try {
        await duty.save()
        res.status(201).send(duty)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router