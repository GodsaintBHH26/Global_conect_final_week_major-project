
import React, { useState } from 'react';
import axios from 'axios';

const SetNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // API call 
      // Example:
      const response = await axios.post("YOUR_BACKEND_API", { password });

      alert("Password reset successful!");
      console.log("Api data :", response.data );
      
       setPassword("");
       setConfirmPassword("");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[550px] h-[505px] flex flex-col gap-2">
        {/* Icon */}
        <div className="flex justify-center mb-1">
          <div className="w-20 h-20 flex items-center justify-center">
            <img
              src="https://thumbs.dreamstime.com/b/simple-black-white-padlock-password-protected-icon-393954163.jpg"
              alt="icon"
              className="w-[100%] h-[100%] rounded-full"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[35px] font-bold text-center mb-.5">Set new password</h2>
        <p className="text-gray-500 text-[20px] font-semibold text-center">
          Must be at least 8 characters
        </p>

        {/* Form */}
        <form className="h-[270px] flex flex-col gap-3 p-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] border rounded-lg pl-3 placeholder:text-md placeholder:font-semibold focus:outline-none"
            />

            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[50px] border rounded-lg pl-3 placeholder:text-md placeholder:font-semibold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full h-[50px] bg-[#2867B7] text-white py-2 rounded-lg hover:bg-blue-800 transition cursor-pointer"
          >
            Reset password
          </button>
        </form>

        {/* Back to login */}
        <div className="text-center mt-3">
          <a
            href="/login"
            className="text-md font-semibold text-gray-600 hover:text-blue-600 flex items-center justify-center gap-1"
          >
            ← Back to log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;

