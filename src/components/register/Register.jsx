import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'


export default function Register({}) {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        //! faill fast. If username and password does not match, then throw err. 
        if(!username || !password) {
            setError('Please fill the fields');
            return;
        }
       
            //getItem is 1 of the 4 propertices of localstorage
            //JSON.parse helps to pass data in a JSON format
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

            //find is attach to the localstorage, and it take the call back function
        const user = existingUsers.find(user => user.username === username);

            //If the username is already exist
        if(user) {
            setError('User already exist');
            return;
        }

        const newUser = {
            username, password
        }
            //setItem is 1 of the 4 properties of localStorage.
            //JSON.stringify helps to structure data verywell.
            //JSON.parse helps to convert any data that's not in JSON back to JSON.
            //After the form is successfully registered, then navigate to login page.
        localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
        navigate('/login');
            //Your users and existingUsers must tally with your login
            //Okay?
    }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
            type="text"
            placeholder='Usename'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input 
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}
