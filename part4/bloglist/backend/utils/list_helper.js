const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const initial = 0
  return blogs.reduce((previous, { likes }) => previous + likes, initial)
}

module.exports = {
  dummy,
  totalLikes,
}
