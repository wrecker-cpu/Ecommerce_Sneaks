import React, { useEffect, useRef } from 'react'
import signup from '/signup.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/UserSlice/UserSlice';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from './firebase';
import { setDoc,doc } from 'firebase/firestore';


export default function Signup() {


    const firstnameRef=useRef(null);
    const lastnameRef=useRef(null);
    const emailRef=useRef(null);
    const passwordRef=useRef(null);
    const confirmPasswordRef=useRef(null);
    const navigate=useNavigate();
    


    async function handleSubmit(e){
        e.preventDefault();
        const firstname = firstnameRef.current.value;
        const lastname = lastnameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;


        if(password===confirmPassword){
            const userData={firstname,lastname};
            // dispatch(registerUser(userData))

            try {
                await createUserWithEmailAndPassword(auth,email,password)
                const user=auth.currentUser;
                if(user){
                    await setDoc(doc(db,"users",user.uid),{
                        ...userData,
                        email:user.email,
                        uid:user.uid,
                    })
                }
                navigate('/login')
                console.log('User registered successfully!', user);
                firstnameRef.current.value = '';
                lastnameRef.current.value = '';
                emailRef.current.value = '';
                passwordRef.current.value = '';
                confirmPasswordRef.current.value = '';
                
                
            } catch (error) {
                console.log(error.message);
            }

           
        }
    }

    // useEffect(() => {
    //     console.log(user)
      
    // }, [user])
    

  return (
    <div className="flex-container">
    <div className="card">
      <div className="card-header">
        <div className='card-heading'>
        <h3>Register</h3>
        <img id='card-image' src={signup} alt='img'></img>
        </div>
        <p>Enter your details to create a new account.</p>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" ref={firstnameRef} placeholder="John" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" ref={lastnameRef} placeholder="Doe" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" ref={emailRef} placeholder="@example.co" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} placeholder="Ex.abc@123" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword"> Confirm Password</label>
          <input type="password" id="confirmpassword" ref={confirmPasswordRef} placeholder='*******' required />
        </div>
        <div className="form-group">
          <p>Already Registered? <Link to={'/login'} className='login-link-button'> Login</Link></p>
        </div>
        
      </div>
      <div className="card-footer">
        <button type='submit'>Register</button>
      </div>
      </form>
    </div>
  </div>
  )
}
