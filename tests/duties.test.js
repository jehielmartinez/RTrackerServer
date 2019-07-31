const request = require('supertest')
const app = require('../app')
const Duty = require('../models/dutyModel')
const mongoose = require('mongoose')

const duty1 = {
    _id: new mongoose.Types.ObjectId().toHexString(),
    description: 'Duty1 for test',
    amount: 444,
    notes: 'This is a test Duty1',
    monthHalf: 'firstH',
    month: '02',
    status: 'pending',
}
const duties = [
    {
        _id: new mongoose.Types.ObjectId().toHexString(),
        description: 'duties1',
        amount: 444,
        notes: 'array of duties for testing',
        monthHalf: 'firstH',
        month: '01',
        status: 'pending',
    },
    {
        _id: new mongoose.Types.ObjectId().toHexString(),
        description: 'duties2',
        amount: 456,
        notes: 'array of duties for testing',
        monthHalf: 'firstH',
        month: '01',
        status: 'pending',
    },
    {
        _id: new mongoose.Types.ObjectId().toHexString(),
        description: 'duties3',
        amount: 444,
        notes: 'array of duties for testing',
        monthHalf: 'firstH',
        month: '01',
        status: 'pending',
    },
    {
        _id: new mongoose.Types.ObjectId().toHexString(),
        description: 'duties4',
        amount: 456,
        notes: 'array of duties for testing',
        monthHalf: 'lastH',
        month: '01',
        status: 'pending',
    },
    {
        _id: new mongoose.Types.ObjectId().toHexString(),
        description: 'duties5',
        amount: 456,
        notes: 'array of duties for testing',
        monthHalf: 'lastH',
        month: '01',
        status: 'pending',
    }

]

beforeEach(async() => {
    try {
        await Duty.deleteMany()
        await new Duty(duty1).save()
        await Duty.create(duties)
    } catch (error) {
        throw new Error(error)
    }
})

test('Should create a new Duty', async() => {
    const resp = await request(app).post('/api/new-duty').send({
        description: 'New Duty Test',
        amount: 555,
        notes: 'This is a Test',
        monthHalf: 'firstH',
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

test('Should edit monthHalf from Duty1', async() => {
    await request(app)
        .patch(`/api/edit-duty/${duty1._id}`)
        .send({monthHalf: 'lastH'})
        .expect(200)
    
    const duty = await Duty.findById(duty1._id)
    expect(duty.monthHalf).not.toBe(duty1.monthHalf)
})

test('Should delete Duty1', async() => {
    await request(app)
        .delete(`/api/delete-duty/${duty1._id}`)
        .send()
        .expect(200)
    
    const duty = await Duty.findById(duty1._id)
    expect(duty).toBeNull()
})

test('Should return month & half queries duties', async() => {
    const response1 = await request(app)
                        .get(`/api/get-duties?month=01&half=firstH`)
                        .send()
                        .expect(200)
    expect(response1.body.length).toBe(3)

    const response2 = await request(app)
                        .get(`/api/get-duties?month=02&half=firstH`)
                        .send()
                        .expect(200)
    expect(response2.body.length).toBe(1)
})