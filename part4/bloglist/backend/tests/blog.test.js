const blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('dummy get total likes', () => {
  const blogs = [
    {
      title: 'Blog Title',
      author: 'blog Author',
      url: 'blog url',
      likes: 5,
    },
  ]
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(5)
  })
})
