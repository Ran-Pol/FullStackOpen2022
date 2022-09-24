// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, post) => {
    return sum + post.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((previousValue, currentValue) =>
    previousValue.likes <= currentValue.likes ? currentValue : previousValue
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
