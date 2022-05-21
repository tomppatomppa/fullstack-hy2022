const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')


userRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users.map(user => user.toJSON()))
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRound = 10
    const passwordHash = await bcrypt.hash(password, saltRound)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = user.save()

    response.status(201).json(savedUser)

})
module.exports = userRouter