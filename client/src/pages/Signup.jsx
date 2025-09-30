import React from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'

const Signup = () => {

  return (

    <div className='wrapper'>

        <header className='header'>
           <div className='logo'>
            <img src="/Logo.png" alt="logo" srcSet=''/>
           </div>
        </header>

       <div className='login-box'>
          <div className="login-image">
            <div className="image">
                <img src="https://360matchpro.com/wp-content/uploads/2024/07/The-7-Best-Signup-Platforms_Feature.png" alt="login" srcSet=''/>
            </div>
        </div>

        <div className="login-form">
             <div className='box'>
               <div className="title">
                <h1>Create your profile and connect with opportunities</h1>
               </div>
            <form>
                <div className='input-box'>
                    <label htmlFor="name">Full Name <span className='text-red-500'>*</span></label>
                    <input type="text" id='name' name='name' placeholder='Full Name' />
                </div>
                <div className='input-box'>
                    <label htmlFor="email">Email <span className='text-red-500'>*</span></label>
                    <input type="text" id='email' name='email' placeholder='Email' />
                </div>
                 <div className='input-box'>
                    <label htmlFor="password">Password <span className='text-red-500'>*</span></label>
                    <input type="password" id='password' name='password' placeholder='Password' />
                </div>
                  <div className='btn-box'>
                    <input type="submit" name='' value='sign up'/>
                </div>
                
                <div className='or'>
                    <span>or</span>
                </div>
                <div className='btn-box-alt'>
                  <Link to='/login'><button className='btn-join'> Already a member | log in</button></Link>
                </div>
            </form>
           </div>
        </div>
       </div>

    </div>
  )
}

export default Signup