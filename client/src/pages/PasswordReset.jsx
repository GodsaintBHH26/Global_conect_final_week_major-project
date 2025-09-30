import React from "react";

const PasswordReset = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">

      <div className="w-full max-w-lg p-8 ">

        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 flex items-center justify-center rounded-full">
            <img src="https://media.istockphoto.com/id/1257404830/vector/email-marketing-icon-vector-graphics.jpg?b=1&s=170x170&k=20&c=G4QGVrVmvedokwCf6-QPyHZ1Q2KEZx0x6VoBqbwTZ6Y=" alt="image" className=" w-[100%] h-[100%]"/>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-[35px] font-bold text-center mb-2">Password reset</h2>
        <p className="text-[20px] font-semibold text-gray-500 text-center mb-6 w-[440px] ">
          We sent a code to{" "}
          <span className="font-semibold text-black">
            amelie@untitledui.com
          </span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-10 mb-6">
          <input
            type="text"
            maxLength="1"
            className="w-16 h-16 border rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            maxLength="1"
            className="w-16 h-16 border rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            maxLength="1"
            className=" w-16 h-16 border rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            maxLength="1"
            className="w-16 h-16 border rounded-lg text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full bg-[#2867B2] text-white py-3 rounded-lg hover:bg-blue-800 transition cursor-pointer"
        >
          Continue
        </button>

        {/* Resend Link */}
        <p className="text-center text-md font-semibold text-gray-500 mt-4">
          Didn’t receive the email?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Click to resend
          </a>
        </p>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <a href="/login" className="text-md font-semibold text-gray-600 hover:text-blue-600 flex items-center justify-center gap-1">
            ← Back to log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
