const res = require('express/lib/response')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const blog = require('../models/blog')
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


//4.8
test('return correct number of blogs and content-type', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialBlogs.length)
})


//4.9* 
test('check id exists', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => expect(blog.id).toBeDefined())
})
//4.10: test 3
test('check if post adds new entry to database', async () => {
    const newBlog = {
        title: 'new blog1',
        author: 'new blog Author1',
        url: 'new blog url',
        likes: 11,
    }
    await api.post('/api/blogs').send(newBlog)
    const response = await api.get('/api/blogs')
    //remove id property
    const contents = response.body.map(({ author, likes, title, url }) => ({ author, likes, title, url }))
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents[3]).toEqual(newBlog)


})
//4.11*: Blog list tests, step4
test('check if likes property is missing', async () => {
    const newBlog = {
        title: 'new blog1',
        author: 'new blog Author1',
        url: 'new blog url',

    }
    await api.post('/api/blogs').send(newBlog)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(blog => blog.likes)
    expect(contents).toBeDefined()

})
//4.12: Blog list tests, step5
test('if title and url does not exist', async () => {
    const newBlog = {
        author: 'new blog Author1',
        likes: 11,
    }
    await api.post('/api/blogs').send(newBlog).expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)


})
describe('Deletion of a blog post', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const response = await api.get('/api/blogs')
        const deleteThis = response.body.map(blog => blog.id)
        console.log(deleteThis[0])
        await api.delete(`/api/blogs/${deleteThis[0]}`).expect(204)  //remove first blog

        const blogsInDb = await api.get('/api/blogs')
        expect(blogsInDb.body).toHaveLength(initialBlogs.length - 1)

    })
})

afterAll(() => {
    mongoose.connection.close()
})