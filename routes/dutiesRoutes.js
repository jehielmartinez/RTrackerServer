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

//GET DUTIES BY month AND monthHalf PASSING IT BY QUERY
router.get('/get-duties', async (req, res) => {
    try {
        const duties = await Duty.find({month: req.query.month, monthHalf: req.query.half})
        res.status(200).send(duties)
    } catch (error) {
        res.status(404).send(error)
    }
})

//CLONE PREVIOUS MONTH DUTIES TO CURRENT MONTH PASSING PREVMONTH BY QUERY
router.get('/clone-duties', async(req, res) => {
    const prevMonth = req.query.prevMonth
    const currentMonth = moment().format('MM')
    
    try {
        const prevMonthDuties = await Duty.find({month: prevMonth})
        const duties = JSON.parse(JSON.stringify(prevMonthDuties))

        duties.forEach(duty => {
            delete duty._id
            delete duty.__v
            duty.month = currentMonth
        })

        const newDuties = await Duty.create(duties)
        res.status(200).send(newDuties)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router