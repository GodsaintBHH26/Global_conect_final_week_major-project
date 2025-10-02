
import React, { useState } from 'react';
import '../styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import API from '../utils/api';
import { toast } from "react-toastify";

const Signup = () => {
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData( {...formData, [e.target.name]: e.target.value, } ); 
  };

  const formSubmit = async (formData) => {
  try {

  // Simple validation
  if (!formData.name || !formData.email || !formData.password) {
   toast.error("All fields are required!");
  return;
  }

  const response = await API.post("/auth/register", formData);
  console.log("Form submitted:", response);
  toast.success("registered success! Please Login");
  setFormData({ name: '', email: '', password: '',});
  navigate("/login");
  reset();

   } catch (error) {
     toast.error(error.response?.data?.message || "Error registering user");
     console.log(error.message)
   }
  };

  return (
    <div className="wrapper">
      <div className="signup-box">
        <div className="signup-image">
          <div className="image">
            <img
              src="https://360matchpro.com/wp-content/uploads/2024/07/The-7-Best-Signup-Platforms_Feature.png"
              alt="login"
            />
          </div>
        </div>

        <div className="signup-form">
          <div className="box">
            <div className="title">
              <h1>Create your profile and connect with opportunities</h1>
            </div>

           <form onSubmit={handleSubmit(formSubmit)}>
              {/* Name */}
              <div className="input-box relative">
                <label htmlFor="name">
                  Full Name <span className="required">*</span>
                </label>
                <input type="text" id="name" placeholder="Full Name" onChange={handleChange}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="input-box relative">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input type="email" id="email" placeholder="Email" onChange={handleChange}
                  {...register("email", { required: "Email is required", pattern: { value:/^[a-z0-9._+-]+@gmail\.com$/, message: "Invalid email address",},
                  })}/>
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="input-box relative">
                <label htmlFor="password">
                  Password <span className="required">*</span>
                </label>
                <input type="password" id="password" placeholder="Password" onChange={handleChange}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}
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
