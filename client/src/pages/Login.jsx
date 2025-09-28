import React from 'react'
import './Login.css'

const Login = () => {

  return (
    <div className='wrapper w-screen'>
        <header className='header'>
           <div className='logo'>
            <img src="./public/logo.png" alt="logo" srcSet='' />
           </div>
           <div className='navigation'>
            <div className='btn-home'>Home</div>
            <div className='btn-join'>join now</div>
           </div>
        </header>

       <div className='login-box'>
        <div className="login-form">
             <div className='box'>
               <div className="title">
                <h1>Welcome to your professional community</h1>
            </div>
            <form>
                <div className='input-box'>
                    <label htmlFor="email">Email <span className='text-red-500'>*</span></label>
                    <input type="text" id='email' name='email' placeholder='Email' />
                </div>
                 <div className='input-box'>
                    <label htmlFor="password">Password <span className='text-red-500'>*</span></label>
                    <input type="password" id='password' name='password' placeholder='Password' />
                </div>
                  <div className='btn-box'>
                    <input type="submit" name='' value='sign in'/>
                    <div className='forgot'>
                     <a href='#'>forgot password?</a>
                    </div>
                </div>
                
                <div className='or'>
                    <span>or</span>
                </div>
                <div className='btn-box-alt'>
                    <button className='btn-join'> New to Linkedin | join now</button>
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