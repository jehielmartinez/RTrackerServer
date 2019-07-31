const request = require('supertest')
const app = require('../app')
const Duty = require('../models/dutyModel')
const mongoose = require('mongoose')

const duty1 = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    description: 'Duty1 for test',
    amount: 444,
    notes: 'This is a test Duty1',
    quarter: 'firstQ',
    month: '02',
    status: 'pending',
}

beforeEach(async() => {
    await Duty.deleteMany()
    await new Duty(duty1).save()
})

test('Should create a new Duty', async() => {
    const resp = await request(app).post('/api/new-duty').send({
        description: 'New Duty Test',
        amount: 555,
        notes: 'This is a Test',
        quarter: 'firstQ',
        month: '01',
        status: 'pending'
    }).expect(201)

    const duty = await Duty.findById(resp.body._id)
    expect(duty).not.toBeNull()
})

test('Should get Duty1 by Id', async() => {
    await request(app)
        .get(`/api/get-duty/${duty1._id}`)
        .send()
        .expect(200, {...duty1, __v:0})

})

test('Should edit quarter from Duty1', async() => {
    await request(app)
        .patch(`/api/edit-duty/${duty1._id}`)
        .send({quarter: 'lastQ'})
        .expect(200)
    
    const duty = await Duty.findById(duty1._id)
    expect(duty.quarter).not.toBe(duty1.quarter)
})
