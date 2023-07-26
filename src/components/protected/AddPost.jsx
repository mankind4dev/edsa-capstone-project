import React from 'react';
import Feed from './Feed';

export default function AddPost({ posts }) {
  return (
    <main className='AddPost'>
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{marginTop: "3rem" }}>
          No post to display.
        </p>
      
      )}
    </main>
  )
}