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
    likes: 10,
  },
  {
    title: 'Blog 3',
    author: 'blog Author3',
    url: 'blog url',
    likes: 1,
  },
  {
    title: 'Blog 4',
    author: 'blog Author1',
    url: 'blog url',
    likes: 4,
  },
  {
    title: 'Blog 2',
    author: 'blog Author2',
    url: 'blog url',
    likes: 10,
  },
]
test('dummy return one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('dummy get total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  test('return favorite', () => {
    const result = listHelper.favoriteBlog(blogs)

    const favoriteBlog = {
      title: 'Blog 2',
      author: 'blog Author2',
      likes: 10,
    }

    expect(result).toEqual(favoriteBlog)
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

describe('most likes', () => {
  test('return author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    const testArray = {
      author: 'blog Author2',
      likes: 20,
    }
    expect(result).toEqual(testArray)
  })
})
