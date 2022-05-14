const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
//const listHelper = require('../utils/blogs_api_helper')
const api = supertest(app)

const initialBlogs = [
    {
        title: 'Blog 1',
        author: 'blog Author1',
        url: 'blog url',
        likes: 5,
    },
    {
        title: 'Blog 2',
        author: 'blog Author2',
        url: 'blog url',
        likes: 10,
    },
    {
        title: 'Blog 3',
        author: 'blog Author3',
        url: 'blog url',
        likes: 1,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})
test('return correct number of blogs and content-type', async () => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})