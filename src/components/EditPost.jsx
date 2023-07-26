import { useEffect } from "react";
import React from 'react';
import { useParams, Link } from "react-router-dom";
export default function EditPost({ posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle }) {

    const { id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    
    useEffect(() => {
        if(post) {
           setEditTitle(post.title);
           setEditBody(post.body) 
        }
    }, [post, setEditTitle, setEditBody])

  return (
    <main className='NewPost'>
        {editTitle &&
            <>
                <h1>Edit Post</h1>
                <form className='newPostForm'	onSubmit={() => e.preventDefault()}>
                <label htmlFor='postTitle'>Title:</label>
                <input 
                    type="text" 
                    id='text'
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor='postBody'>Post:</label>
                <textarea 
                    id='postBody'
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>

                </form>
            </>
        } 
         {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/NewPost'>Go back to Post </Link>
                    </p>
                </> 
            }
    </main>
  )
}
