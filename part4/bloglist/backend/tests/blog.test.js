const listHelper = require('../utils/list_helper')

const blogs = [
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
    likes: 7,
  },
  {
    title: 'Blog 3',
    author: 'blog Author3',
    url: 'blog url',
    likes: 1,
  },
  {
    title: 'Blog 2',
    author: 'blog Author1',
    url: 'blog url',
    likes: 4,
  },
]
test('dummy return one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('dummy get total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs[0])
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  test('return favorite', () => {
    const result = listHelper.favoriteBlog(blogs)

    const testArray = {
      title: 'Blog 2',
      author: 'blog Author',
      likes: 7,
    }

    expect(result).toEqual(testArray)
  })
})

describe('most blogs', () => {
  test('return author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const testArray = {
      author: 'blog Author1',
      blogs: 2,
    }
    expect(result).toEqual(testArray)
  })
})
