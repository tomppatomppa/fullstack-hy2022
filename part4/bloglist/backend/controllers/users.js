const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/users')


userRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users.map(user => user.toJSON()))
})

userRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }
    if (!password || password.length < 3) {
        return response.status(400).json({
            error: "password is required and it has to be at least 3 characters long"
        })
    }

    const saltRound = 10
    const passwordHash = await bcrypt.hash(password, saltRound)

    const user = new User({
        username,
        name,
        passwordHash,
    })
    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
})
module.exports = userRouter