const blogsRouter = require('express').Router()


const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

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
  })

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if (blog) {
    await Blog.findByIdAndRemove(blog.id)
    response.status(204).end()
  } else {
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
module.exports = blogsRouter
