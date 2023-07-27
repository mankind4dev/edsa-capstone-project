import { React, useState, useEffect, useRef } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate } from 'react-router-dom';
/* import './SignUp.css' */
 


    //Validation of username And Password
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%]).{8, 24}$/;





export default function Register() {

        //User input when the input load
        //It allow to set focus on input
    const userRef = useRef();
    const errRef = useRef();

        //User State
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const[matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


        //Set a focuswhen the components load
    useEffect(() => {
        userRef.current.focus();

    }, [])

        //To validate the username f the field
    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = GMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])
    

        //For the Password
    useEffect(() => {
        const result = PWD_REGEX.test(pwd.trim());
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])


        //Anytime the 3 props changes info, then Error message alert
    useEffect(()=> {
        setErrMsg('');
    }, [user, email, pwd, matchPwd])


        //On submittion form to prevent reload
    const handleSubmit = async (e) => {
        e.preventDefault();
        Navigate('/Login')

            //if button enable with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = GMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(pwd);
        if(!v1 || !v2 || !v3) {
            setErrMsg("invalid Entry");
            return;
        }
        console.log(user, email, pwd);
        setSuccess(true);
    }

  return (
    <div className='Register'>
        {/* // Message will alert If we have successfully login with registration forms. */}
    {success ? (
        <section>
            <h1>Success</h1>
            <p>
                <Link to='#'>Sign In</Link>
            </p>
        </section>

    ) : (
    <section>
       <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
       <h1>Register</h1>
       <form onSubmit={handleSubmit}>

                {/* //Username */}
            <label htmlFor="username">
                Username:
                <span className={validName ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} /></span>
                <span className={validName || !user ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} /></span>
            </label>
            <input 
                type="text" 
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
            />
            <div className='offscreeTtext'>
               <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}><FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, number, underscores, hyphens allowed.
            </p> 
            </div>
            

                {/* //Email  */}
            <label htmlFor="email">
                Email:
                <span className={validEmail ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} /></span>
                <span className={validEmail || !email ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} /></span>
            </label>
            <input 
                type="email" 
                id='email'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
            />
            <p id='uidnote' className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}><FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters <br />
             beginning with a letter, allowing letters<br /> 
             numbers, underscores, and hyphens @ allowed.
            
             
            </p>

                {/* //Password */}
            <label htmlFor="password">
                password: 
                <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} /></span>
            </label>
            <input 
                type="password" 
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby='pwdnote'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
            />
            <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special characters: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span> <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
            </p>

                {/* //Confirm Password */}
            <label htmlFor="confirm_pwd">
                Confirm Password:
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <input 
                type="password" 
                id='confirm_pwd'
                onChange={() => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby='confirmnote'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
            />
            <p id='confirm_pwd' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password filds.
            </p>

                {/* //By disable, the button is going to be blur if the details is wrong. */}
            <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
       </form>

       <p className='alreadyLink'>
            Already registerd? 
            <span className='line'>
                    {/* //Router a link */}
                <Link to='/Login'>Sign In</Link>
            </span>
       </p>
    </section>
    )}
    </div>
  )
}
