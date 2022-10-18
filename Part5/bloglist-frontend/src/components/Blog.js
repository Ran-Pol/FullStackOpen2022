import React from 'react'

const Blog = ({ blog }) => {
  const [viewAll, setViewAll] = React.useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <>
      {viewAll ? (
        <div style={blogStyle}>
          <p>
            {blog.title} {blog.author}
            <button onClick={() => setViewAll((prev) => !prev)}>view</button>
          </p>
        </div>
      ) : (
        <div style={blogStyle}>
          <p>
            {blog.title} {blog.author}{' '}
            <button onClick={() => setViewAll((prev) => !prev)}>hide</button>
          </p>

          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </>
  )
}

export default Blog

// author
// id
// likes
// title
// url
// user {name, username}
