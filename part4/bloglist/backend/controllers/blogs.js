const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/users')

const jwt = require('jsonwebtoken')
const req = require('express/lib/request')





blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs.map(blog => blog.toJSON()))

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'Title or Url missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0, //default to 0 if no likes property exists
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const token = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === token.id.toString()) {
    await Blog.findByIdAndRemove(blog.id)

    response.status(204).end()
  }
  else {
    return response.status(403).json({
      error: 'Cannot find or delete note'
    })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  }

  const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog)
  response.json(blog)

})
//get individual blog
blogsRouter.get('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  response.json(blog)

})
module.exports = blogsRouter
