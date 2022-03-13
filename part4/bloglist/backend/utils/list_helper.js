const { keys } = require('lodash')
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const initial = 0
  return blogs.reduce((previous, { likes }) => previous + likes, initial)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(
    (prev, curr) => (prev = prev.likes > curr.likes ? prev : curr)
  )
  const result = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
  return result
}

const mostBlogs = (blogs) => {
  const arr = _.map(blogs, 'author')
  const countOccurance = _.chain(arr).countBy().toPairs()
  const [a, ...rest] = countOccurance
  const result = {
    author: a[0],
    blogs: a[1],
  }
  return result
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
