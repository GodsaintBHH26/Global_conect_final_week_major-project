
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const PasswordReset = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  // OTP change handler
  const handleChange = (e, index) => {

    const value = e.target.value.replace(/[^0-9]/g, ""); // only numbers allowed
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto focus next input
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };


  // Submit OTP
  const handleSubmit = async () => {
    const otpValue = otp.join(""); // array ko string me convert
    if (otpValue.length !== 4) {
      alert("Please enter all 4 digits!");
      return;
    }
     try {

      // API call
      const response = await axios.post(" backend Api Here ", { otp: otpValue, email: "user@example.com", }); // dynamic email

      alert(response.data.message || "OTP verified successfully ");
      setOtp(["", "", "", ""]);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid OTP ");
    }
  };



   // Resend OTP
  const handleResend = async () => {
  try {
    const response = await axios.post(" backend Resend OTP API here ", {
      email: "amelie@untitledui.com" // dynamic email
    });

    alert(response.data.message || "OTP resent successfully!");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to resend OTP.");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen ">
 
      <div className="w-full max-w-lg p-8 shadow-xl pt-2 rounded-lg ">
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 flex items-center justify-center rounded-full">
            <img
              src="https://media.istockphoto.com/id/1257404830/vector/email-marketing-icon-vector-graphics.jpg?b=1&s=170x170&k=20&c=G4QGVrVmvedokwCf6-QPyHZ1Q2KEZx0x6VoBqbwTZ6Y="
              alt="image"
              className="w-[100%] h-[100%]"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[35px] font-bold text-center mb-2">Password reset</h2>
        <p className="text-[20px] font-semibold text-gray-500 text-center mb-6 w-[440px]">
          We sent a code to{" "}
          <span className="font-semibold text-black">
            amelie@untitledui.com
          </span>
        </p>


        {/* OTP Inputs */}
        <div className="flex justify-center gap-10 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-16 h-16 border rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
        </div>


        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#2867B2] text-white py-3 rounded-lg hover:bg-blue-800 transition cursor-pointer">
          Submit OTP
        </button>

        {/* Resend Link */}
        <p className="text-center text-md font-semibold text-gray-500 mt-4">
          Didn’t receive the email?{" "}
          <button className="text-blue-600 hover:underline cursor-pointer"onClick={handleResend} >
            Click to resend
          </button>
        </p>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <Link to="/login"
            className="text-md font-semibold text-gray-600 hover:text-blue-600 flex items-center justify-center gap-1">
            ← Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
