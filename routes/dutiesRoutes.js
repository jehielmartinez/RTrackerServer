const express = require('express')
const router = express.Router()
const Duty = require('../models/dutyModel')
const moment = require('moment')

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

//GET ONE DUTY BY ID
router.get('/get-duty/:id', async(req, res) => {
    try {
        const duty = await Duty.findById(req.params.id)
        res.status(200).send(duty)
    } catch (error) {
        res.status(404).send(error)
    }
})

//EDIT DUTY
router.patch('/edit-duty/:id', async (req, res) => {
    try {
        await Duty.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send()
    } catch (error) {
        res.status(404).send(error)
    }
})

//DELETE DUTY
router.delete('/delete-duty/:id', async (req, res) => {
    try {
        await Duty.findByIdAndDelete(req.params.id)
        res.status(200).send()
    } catch (error) {
        res.status(404).send(error)
    }
})

//GET DUTIES BY month AND monthHalf
router.get('/get-duties', async (req, res) => {
    try {
        const duties = await Duty.find({month: req.query.month, monthHalf: req.query.half})
        res.status(200).send(duties)
    } catch (error) {
        res.status(404).send(error)
    }
})

//TRANSFER PREVIOUS MONTH DUTIES TO CURRENT MONTH
router.get('/transfer-duties', async(req, res) => {
    const currentMonth = moment().format('MM')
    const prevMonth = moment().subtract(1, 'month').format('MM')
    try {
        const prevMonthDuties = await Duty.find({month: prevMonth})
        await prevMonthDuties.forEach(duty => {
            delete duty._id
            delete duty.__v
            duty.month = currentMonth
        })
        const duties = await Duty.create(prevMonthDuties)
        res.status(200).send(duties)
    } catch (error) {
        res.status(400).send(error)

    }
})

module.exports = router