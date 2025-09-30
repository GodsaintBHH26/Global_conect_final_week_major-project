
import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Signup = () => {
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required!");
      return;
    }

    // Api Call

    console.log("Form submitted:", formData);
    setFormData({ name: '', email: '', password: '',});
    reset();

  
  };

  return (
    <div className="wrapper">
      <header className="header">
        <div className="logo">
          <img src="/Logo.png" alt="logo" />
        </div>
      </header>

      <div className="login-box">
        <div className="login-image">
          <div className="image">
            <img
              src="https://360matchpro.com/wp-content/uploads/2024/07/The-7-Best-Signup-Platforms_Feature.png"
              alt="login"
            />
          </div>
        </div>

        <div className="login-form">
          <div className="box">
            <div className="title">
              <h1>Create your profile and connect with opportunities</h1>
            </div>

           <form onSubmit={handleSubmit(formSubmit)}>
              {/* Name */}
              <div className="input-box relative">
                <label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 absolute top-9 right-4">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="input-box relative">
                <label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required", pattern: { value:/^[a-z0-9._+-]+@gmail\.com$/, message: "Invalid email address",},
                  })}/>
                {errors.email && <p className="text-red-500 absolute top-9 right-4 ">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="input-box relative">
                <label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && <p className="text-red-500 absolute top-9 right-4">{errors.password.message}</p>}
              </div>

              {/* Submit */}
              <div className="btn-box">
                <input type="submit" value="Sign Up" />
              </div>

              <div className="or">
                <span>or</span>
              </div>

              <div className="btn-box-alt">
                <Link to="/login">
                  <button type="button" className="btn-join">
                    Already a member | Log in
                  </button>
                </Link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
