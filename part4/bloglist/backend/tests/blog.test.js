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

describe('favorite blog', () => {
  const blogs = [
    {
      title: 'Blog 1',
      author: 'blog Author',
      url: 'blog url',
      likes: 5,
    },
    {
      title: 'Blog 2',
      author: 'blog Author',
      url: 'blog url',
      likes: 7,
    },
    {
      title: 'Blog 3',
      author: 'blog Author',
      url: 'blog url',
      likes: 1,
    },
  ]
  test('return favorite', () => {
    const result = listHelper.favoriteBlog(blogs)
    console.log(result)
    expect(result).toEqual(blogs[1])
  })
})
