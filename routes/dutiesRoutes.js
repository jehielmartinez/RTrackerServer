const express = require('express')
const router = express.Router()
const Duty = require('../models/dutyModel')

//NEW DUTY
router.post('/new-duty', async (req, res) => {

    const duty = new Duty(req.body)

    try {
        await duty.save()
        res.status(201).send(duty)
        console.log(`new duty created: ${duty.description}`)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/get-duty', async(req, res) => {
    try {
        const duty = await Duty.findById(req.body.id)
        res.status(200).send(duty)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.patch('/edit-duty', async (req, res) => {
    try {
        const duty = Duty.findByIdAndUpdate(req.body._id, req.body)
        res.status(200).send(duty)
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router