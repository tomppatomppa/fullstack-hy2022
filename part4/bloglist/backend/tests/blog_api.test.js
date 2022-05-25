const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/users')
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
    await User.deleteMany({})
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
}, 10000)

describe('Adding blogs to database', () => {
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

    test('check if post adds new entry to database', async () => {

        const newUser = {
            username: "LoginTestUser1",
            name: "New Test User 1",
            password: "1234"
        }
        await api.post('/api/users').send(newUser)
            .expect(201)

        const loginNewUser = {
            username: "LoginTestUser1",
            password: "1234"
        }
        const user = await api.post('/api/login').send(loginNewUser)
            .expect(200)
        const token = user.body.token

        const newBlog = {
            title: 'new blog1',
            author: 'new blog Author1',
            url: 'new blog url',
            likes: 11,
        }
        await api.post('/api/blogs').send(newBlog).set({ Authorization: `Bearer ${token}` })
        const response = await api.get('/api/blogs')
        //remove id property
        const contents = response.body.map(({ author, likes, title, url }) => ({ author, likes, title, url }))
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(contents[3]).toEqual(newBlog)

    })

    test('Add new blog with invalid token', async () => {
        const newBlog = {
            title: 'new blog1',
            author: 'new blog Author1',
            url: 'new blog url',
            likes: 11,
        }
        await api.post('/api/blogs').send(newBlog).expect(401)
    })
})

describe('I blogs database is not empty', () => {
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

})

describe('Deletion of a blog post', () => {

    test('succeeds with status code 204 if id is valid', async () => {
        const newUser = {
            username: "LoginDeleteBlogUser",
            name: "New Test User 1",
            password: "1234"
        }
        await api.post('/api/users').send(newUser)
            .expect(201)

        const loginNewUser = {
            username: "LoginDeleteBlogUser",
            password: "1234"
        }
        const user = await api.post('/api/login').send(loginNewUser)
            .expect(200)
        const token = user.body.token

        const newBlog = {
            title: 'Delete This blog post',
            author: 'new blog Author1',
            url: 'new blog url',
            likes: 11,
        }
        const blog = await api.post('/api/blogs').send(newBlog).set({ Authorization: `Bearer ${token}` })

        await api.delete(`/api/blogs/${blog.body.id}`).set({ Authorization: `Bearer ${token}` }).expect(204)

        const blogsInDb = await api.get('/api/blogs')
        expect(blogsInDb.body).toHaveLength(initialBlogs.length)

    })
})
describe('Update existing blog', () => {
    test('update existing blog likes', async () => {
        const response = await api.get('/api/blogs')
        const updateThisBlog = response.body.map(blog => blog.id)

        const newBlog = {
            title: 'Blog 2',
            author: 'blog Author2',
            url: 'blog url',
            likes: 7,
        }
        await api.put(`/api/blogs/${updateThisBlog[0]}`).send(newBlog).expect(200)

    })
})

afterAll(() => {
    mongoose.connection.close()
})