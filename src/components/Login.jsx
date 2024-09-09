import React, { useRef } from 'react';
import login from '/login.png'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';


export default function Login() {

    const emailRef=useRef();
    const passwordRef=useRef();
    const navigate=useNavigate();


    async function handleSubmit(e){
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            await signInWithEmailAndPassword(auth,email,password)
            console.log('User signed in successfully!');
            emailRef.current.value = '';
            passwordRef.current.value = '';
            navigate('/');
        } catch (error) {
            console.log(error.message);
            if (error.code === 'auth/wrong-password') {
              alert('Wrong password. Please try again.');
            } else {
              alert(error.message);
            }
        }
       
    }

  return (
    <div className="flex-container">
    <div className="card">
      <div className="card-header">
        <div className='card-heading'>
        <h3>Login</h3>
        <img src={login} alt='img'></img>
        </div>
        <p>Enter your email and password to access your account.</p>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="m@example.com" ref={emailRef} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <div className="form-group">
          <p>Don't have an account? <Link to={'/signup'} className='login-link-button'>Sign-Up</Link></p>
        </div>
      </div>
      <div className="card-footer">
        <button>Login</button>
      </div>
      </form>
    </div>
  </div>
  );
}
