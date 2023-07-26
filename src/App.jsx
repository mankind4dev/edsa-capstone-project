import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/protected/Home';
import NewPost from './components/protected/NewPost';
import AddPost from './components/protected/AddPost'
import PostPage from './components/protected/PostPage';
import EditPost from './components/EditPost';
import About from './components/About';
import Login from './components/register/Login';
import SignUp from './components/register/SignUp';
import Missing from './components/Missing';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { format } from 'date-fns';

import api from './api/Posts';


function App() {
  
  const [posts, setPosts] = useState([ ])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  useEffect(() =>{
    const fetchPosts = async() => {
      try {
        const response = await api.get('/posts');
        if(response && response.data) setPosts(response.data)
      }catch(error) {
        if(err.response) {
          console.log(err.respone.data);
          console.log(err.respone.status);
          console.log(err.respone.headers);
        }else{
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchPosts();
  }, [])




  useEffect(() =>{
    const filteredResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLocaleLowerCase()));

      setSearchResults(filteredResults.reverse());
  }, [posts, search])


  useEffect(() =>{
    const fetchPosts = async () => {
      try{
        const response = await api.get('/Posts');
        setPosts(response.data);
      }catch(err) {
        if (err.response) {
          // Not in response range
        console.log(err.respone.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        }else {
          console.log(`Error: ${err.message}`);
        }
        
      }
    }

    fetchPosts();
  }, [ ])

  const handleDelete = async(id) => {
    try{
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(posts => posts.id !== id);
      setPosts(postsList);
      navigate('/post');
    }catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }


  const handleEdit = async(id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try{
      const response = await api.put(`/posts${id}`, updatedPost);
      setPosts=(posts.map(post => post.id === id ? {...response.data} : post));
      setEditTitle("");
      setEditBody("");
      navigate('/AddPost');
    }catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
      const response = await  api.post('/posts', newPost)
    
      const allPosts = [...posts, response.data ];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/AddPost');
    
    }catch(error) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className='App'>
       <Header />
       <Nav search={search} setSearch={setSearch}/>
       <Routes>
        <Route exact path='/' element={<Home />} />
        
        <Route exact path='/post' element={<NewPost  
          posts={posts} 
          handleSubmit={handleSubmit}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
        
        />} />

        <Route exact path='/edit/:id' element={<EditPost  
          posts={posts} 
          handleEdit={handleEdit}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editBody={editBody}
          setEditBody={setEditBody}
        
        />} />
        <Route exact path='/AddPost' element={<AddPost posts={searchResults}/>} />
        <Route exact path='/Post/:id' element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        <Route exact path='/About' element={<About />} />
        <Route exact path='/Login' element={<Login />} />
        <Route exact path='/SignUp' element={<SignUp />} />
        <Route exact path='/*' element={<Missing />} />
       </Routes>
       <Footer />
    </div>
  )
}

export default App
