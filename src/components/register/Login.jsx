import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Login({onLogin}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  //Must be Default
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    
    const existingUser = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUser.find((user) => user.username === username);
    if (!user) {
      setError("User does not exist");
      return;
    }

    //if user's password does not match to password
    if (user.password !== password) {
      setError("Password is incorrect");
      return;
    }

    //if its successuly login, navigate to Home Page
    //localStorage.setItem("user", JSON.stringify(user));
    onLogin(user); //pass the props in Register
    //setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <div className="Login">
      
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">
          Uername: 
        </label>
        <input
          type="text"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="username">
          Password:
        </label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="forgetPass"><Link to='/forgetPassword'>ForgetPassword</Link></p>

        {error && <p>{error}</p>}
        <button type="submit">Login</button>

        <p className='signUp'>
        New to Gogo<span className="headerColor">Live</span>?  
            <span className='signUpLink'>
                    {/* //Router a link */}
                <Link to='/register'>Create an account.</Link>
            </span>
       </p>
      </form>
      
    </div>
  );
}
