import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ search, setSearch}) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if(user) {
      setIsLoggedIn(true)
    }
  }, []);

  //Befor having access to this, you must login
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <div className='Nav'>
        <form className='seacrhForm' onSubmit={(e) => e.preventDefault()}>
            <input 
                type="text" 
                id='search'
                placeholder='Seacrh Post'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>

        <ul>
            <li><Link to='/'>Home</Link></li> 
           <li><Link to='/AddPost'>Post</Link></li>
           <li><Link to='/post'>AddPost</Link></li>
            <li><Link to='/About'>About</Link></li>
            <li>{isLoggedIn ? (<button onClick={handleLogout}>Logout</button>): <Link to="/login">Login</Link>}</li>
       </ul>
       
      
      <div className='button'>
        <button className='loginBtn'>
          <Link to='/Login'>Login</Link>
        </button>
        <button className='signUpBtn'>
          <Link to='/register'>Sign-Up</Link>
        </button>
      </div>
    </div>
  )
}
