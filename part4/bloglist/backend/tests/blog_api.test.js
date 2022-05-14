const res = require('express/lib/response')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

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
}, 10000)


describe('when database is not empty', () => {
    test('return correct number of blogs and content-type', async () => {
        const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(initialBlogs.length)
    })
    //4.9* how to do this?
    test('check id exists', async () => {
        const result = await api.get('/api/blogs')
        // console.log(result)
        expect(result.body.id).toBeDefined()
    })
})


//4.10: test 3
test('check if post adds new entry to database', async () => {

    const newBlog = {
        title: 'new blog1',
        author: 'new blog Author1',
        url: 'new blog url',
        likes: 11,
    }
    let blogObject = new Blog(newBlog)
    await blogObject.save()
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(initialBlogs.length + 1)

})
test('check if likes property is missing', async () => {

    let blogs = await Blog.find({})
    blogs = blogs.map(blog => blog.toJSON())
    const copy = blogs.map(blog => {
        if (!blog.likes)
            return { ...blog, likes: 0 }
        return blog
    });
    console.log(copy)


})

afterAll(() => {
    mongoose.connection.close()
})