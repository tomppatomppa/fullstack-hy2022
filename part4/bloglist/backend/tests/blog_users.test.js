const { contentType } = require('express/lib/response')
const { forEach, before } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { use } = require('../app')
const app = require('../app')
const User = require('../models/users')

const api = supertest(app)

const initialUsers = [
    {
        username: "new user",
        name: "Kalle",
        password: "123"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
}, 10000)

describe('when db is not empty', () => {
    test('return as json', async () => {
        await api.get('/api/users').expect(200).expect('Content-type', /application\/json/)
    })
})
describe('Adding invalid new user', () => {

    test('add user with invalid username', async () => {
        const invalidUsername = [{
            username: "n",
            name: "Kalle",
            password: "133"
        }]

        await api.post('/api/users').send(invalidUsername[0]).expect(400)
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(initialUsers.length)
    })
    test('add user with invalid password', async () => {
        const invalidPassword = [{
            username: "kalle123",
            name: "Kalle",
            password: "13"
        }]

        await api.post('/api/users').send(invalidPassword[0]).expect(400)
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(initialUsers.length)
    })


})

afterAll(() => {
    mongoose.connection.close()
})

