import React from 'react'

const SetNewPassword = () => {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 ">

      <div className=" w-[550px] h-[505px] flex flex-col gap-2">

        {/* Icon */}
        <div className="flex justify-center mb-1">
          <div className="w-20 h-20 flex items-center justify-center ">
            <img src="https://thumbs.dreamstime.com/b/simple-black-white-padlock-password-protected-icon-393954163.jpg" alt="image" className="w-[100%] h-[100%] rounded-full"/>
          </div>
        </div>


        {/* Heading */}
        <h2 className="text-[35px] font-bold text-center mb-.5">Set new password</h2>
        <p className="text-gray-500 text-[20px] font-semibold text-center">
        Must be at least 8 characters
        </p>

        {/* Email Input */}
        <form className="h-[270px] flex flex-col gap-3 p-3">
          <div className="flex flex-col gap-2">

            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Password</label>
            <input type="email" id="email"  placeholder="********"
              className="w-full h-[50px] border rounded-lg pl-3 placeholder:text-md placeholder:font-semibold focus:outline-none " />

            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Confirm password</label>
            <input type="email" id="email"  placeholder="********"
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
  )
}

export default SetNewPassword