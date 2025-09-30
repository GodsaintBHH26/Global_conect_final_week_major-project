import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

   const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Email:", email);

    // API call reset link 
    // axios.post("/forgot-password", { email });

    setEmail("");
  };



  return (
    <div className="flex items-center justify-center gap-20 min-h-screen bg-gray-50">

       <div className=" w-[600px] h-[600px]">
          <img src="https://img.freepik.com/premium-vector/forgot-password-concept-illustration_114360-1095.jpg" alt="image"/>
        </div>

      <div className=" w-[500px] h-[430px] flex flex-col gap-2 shadow-xl pt-2 rounded-lg">

        {/* Icon */}
        <div className="flex justify-center mb-1">
          <div className="w-14 h-14 flex items-center justify-center rounded-full">
            <img src="https://media.istockphoto.com/id/921664276/vector/mobile-application-for-fingerprint-recognition.jpg?s=612x612&w=0&k=20&c=LU0HlPkgdV-k3Y5AzJ6JjCKQrSk1sr3_VCHcGCntBTU=" alt="image" className="w-[100%] h-[100%] rounded-full"/>
          </div>
        </div>


        {/* Heading */}
        <h2 className="text-[35px] font-bold text-center mb-.5">Forgot password?</h2>
        <p className="text-gray-500 text-[20px] font-semibold text-center">
          No worries, we’ll send you reset instructions.
        </p>

        {/* Email Input */}
        <form className="h-[200px] flex flex-col gap-3 p-6.5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email <span className='text-red-500'>*</span></label>
            <input type="email" id="email"  placeholder="Enter your email" value={email}  onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] border rounded-lg pl-3 placeholder:text-md placeholder:font-semibold focus:outline-none " required />
          </div>

          {/* Button */}
          <button type="submit"
            className="w-full h-[50px] bg-[#2867B7] text-white py-2 rounded-lg hover:bg-blue-800 transition cursor-pointer">
            Send OTP
          </button>
        </form>

        {/* Back to login */}
        <div className=" text-center ">
          <Link to='/login'className=" flex items-center justify-center"><button className="text-md font-semibold text-gray-600 hover:text-blue-600 flex items-center justify-center gap-1 cursor-pointer" >
            ← Back to log in
          </button></Link>
      
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
