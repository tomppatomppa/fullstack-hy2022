
const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/users')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        request['token'] = authorization.substring(7)
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken) {
        return response.status(401).json({
            error: 'token is invalid or missing'
        })
    }
    const user = await User.findById(decodedToken.id)
    request.user = user

    next()
}
const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({
            error: error.message
        })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })

    }
    logger.error(error.message)
    next(error)
}

module.exports = {
    requestLogger, tokenExtractor, userExtractor, errorHandler
}