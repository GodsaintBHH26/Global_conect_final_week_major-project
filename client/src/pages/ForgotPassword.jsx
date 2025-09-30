import React from "react";

const ForgotPassword = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 ">

      <div className=" w-[500px] h-[430px] flex flex-col gap-2">

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
        <form className="h-[200px] flex flex-col gap-3 p-6.5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email </label>
            <input type="email" id="email"  placeholder="Enter your email"
              className="w-full h-[50px] border rounded-lg pl-3 placeholder:text-md placeholder:font-semibold focus:outline-none " />
          </div>

          {/* Button */}
          <button type="submit"
            className="w-full h-[50px] bg-[#2867B7] text-white py-2 rounded-lg hover:bg-blue-800 transition cursor-pointer">
            Reset password
          </button>
        </form>

        {/* Back to login */}
        <div className=" text-center">
          <a href="/login" className="text-md font-semibold text-gray-600 hover:text-blue-600 flex items-center justify-center gap-1" >
            ← Back to log in
          </a>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
