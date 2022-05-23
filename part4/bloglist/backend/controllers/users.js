const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/users')


userRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users.map(user => user.toJSON()))
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (username.length < 3) {
        return response.status(400).json({
            error: 'username must be at least 3 characters long'
        })
    }
    if (password.length < 3) {
        return response.status(400).json({
            error: 'password must be at least 3 characters long'
        })
    }
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    const saltRound = 10
    const passwordHash = await bcrypt.hash(password, saltRound)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)

})
module.exports = userRouter