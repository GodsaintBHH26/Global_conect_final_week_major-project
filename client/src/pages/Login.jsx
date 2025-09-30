import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {


 const handleSubmit = (e) => {
  e.preventDefault();

  // API call / validation 
  console.log("Form submitted");

};

  return (
    <div className='wrapper w-screen'>
        <header className='header'>
           <div className='logo'>
            <img src="/Logo.png" alt="logo" srcSet='' />
           </div>
           <div className='navigation'>
            <div className='btn-home'>Home</div>
            <Link to='/' ><div className='btn-join'>join now</div></Link>
           </div>
        </header>

       <div className='login-box'>
        <div className="login-form">
             <div className='box'>
               <div className="title">
                <h1>Welcome to your professional community</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                    <label htmlFor="email">Email <span className='text-red-500'>*</span></label>
                    <input type="email" id='email' name='email' placeholder='Email' required/>
                </div>
                 <div className='input-box'>
                    <label htmlFor="password">Password <span className='text-red-500'>*</span></label>
                    <input type="password" id='password' name='password' placeholder='Password' required/>
                </div>
                  <div className='btn-box'>
                    <input type="submit" name='' value='login'/>
                    <div className='forgot'>
                    <Link to="/forgotPassword">Forgot password?</Link>
                    </div>
                </div>
                
                <div className='or'>
                    <span>or</span>
                </div>
                <div className='btn-box-alt'>
                    <Link to='/'><button className='btn-join'> New to Linkedin | join now</button></Link>
                </div>
            </form>
           </div>
        </div>

        <div className="login-image">
            <div className="image">
                <img src="https://img.freepik.com/premium-vector/man-sits-front-phone-that-says-logitech_1314854-10316.jpg?semt=ais_hybrid&w=740&q=80" alt="login" srcSet=''/>
            </div>
        </div>

       </div>

    </div>
  )
}

export default Login