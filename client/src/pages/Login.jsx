
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted", data);
    // API call / validation

  };

  return (
    <div className='wrapper'>
      <div className='login-box'>
        <div className="login-form">
          <div className='box'>
            <div className="title">
              <h1>Welcome to your professional community</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='input-box relative'>
                <label htmlFor="email">Email <span className='required '>*</span></label>
                <input
                  type="email"
                  id='email'
                  placeholder='Email'
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: {
                      value: /^[a-z0-9._+-]+@gmail\.com$/,
                      message: "Only lowercase Gmail is allowed"
                    }
                  })}
                />
                {errors.email && <p className='error'>{errors.email.message}</p>}
              </div>

              <div className='input-box relative'>
                <label htmlFor="password">Password <span className='required'>*</span></label>
                <input
                  type="password"
                  id='password'
                  placeholder='Password'
                  {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
                />
                {errors.password && <p className='error '>{errors.password.message}</p>}
              </div>

              <div className='btn-box'>
                <input type="submit" value='Login' />
                <div className='forgot'>
                  <Link to="/forgotPassword">Forgot password?</Link>
                </div>
              </div>

              <div className='or'>
                <span>or</span>
              </div>

              <div className='btn-box-alt'>
                <Link to='/signup'><button className='btn-join'>New to LinkedIn | Join Now</button></Link>
              </div>
            </form>
          </div>
        </div>

        <div className="login-image ">
          <div className="image">
            <img src="https://img.freepik.com/premium-vector/man-sits-front-phone-that-says-logitech_1314854-10316.jpg?semt=ais_hybrid&w=740&q=80" alt="login" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
