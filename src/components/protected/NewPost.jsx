import React from 'react'

const AddPost = ({
  handleSubmit, postTitle, setPostTitle, postBody, setPostBody
}) => {
  return (
    <main className='NewPost'>
        <h1>New Post</h1>
        <form className='newPostForm'	onSubmit={handleSubmit}>
          <label htmlFor='postTitle'>Title:</label>
          <input 
            type="text" 
            id='text'
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <label htmlFor='postBody'>Post:</label>
          <textarea 
            id='postBody'
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <button type='submit'>Submit</button>

        </form>
    </main>
  )
}

export default AddPost