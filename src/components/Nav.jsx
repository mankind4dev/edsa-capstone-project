import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ search, setSearch}) {
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
       </ul>
       
      
      <div className='button'>
        <button className='loginBtn'>
          <Link to='/Login'>Login</Link>
        </button>
        <button className='signUpBtn'>
          <Link to='/SignUp'>Sign-Up</Link>
        </button>
      </div>
    </div>
  )
}
