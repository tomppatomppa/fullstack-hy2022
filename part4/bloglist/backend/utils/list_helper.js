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

  return favorite
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
