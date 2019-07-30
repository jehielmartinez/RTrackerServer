const request = require('supertest')
const app = require('../app')
const Duty = require('../models/dutyModel')
const mongoose = require('mongoose')

beforeEach(async() => {
    await Duty.deleteMany()
})

test('Should create a new Duty', async() => {
    const resp = await request(app).post('/api/new-duty').send({
        description: 'Duty Test',
        amount: 555,
        notes: 'This is a Test',
        quarter: 'firstQ',
        month: '01'
    }).expect(201)

    const duty = await Duty.findById(resp.body._id)
    expect(duty).not.toBeNull()
})
