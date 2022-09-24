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

const mostBlogs = (listBlogs) => {
  const authorMostBlogs = listBlogs.reduce((authors, nextBlog) => {
    authors[nextBlog['author']] = authors[nextBlog['author']] || 0
    authors[nextBlog['author']] += 1
    return authors
  }, {})
  const [author, blogs] = Object.entries(authorMostBlogs).reduce(
    (startValue, currentValue) =>
      startValue[1] >= currentValue[1] ? startValue : currentValue
  )
  return {
    author,
    blogs,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
