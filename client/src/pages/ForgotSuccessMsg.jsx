import React from 'react'
import { Link } from 'react-router-dom';

const ForgotSuccessMsg = () => {

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-[430px] bg-white rounded-2xl p-7 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
            <div className='w-[100px] h-[100px]'>
                <img src='https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWNzZ3d2cWd3bWhuc280bXoyMTc3c2hubG9kYWZ4dzRrNWV3Mmd6MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tf9jjMcO77YzV4YPwE/giphy.gif' alt='check logo'/>
            </div>
        </div>

        {/* Heading */}
        <h1 className="text-[45px] font-semibold mb-2">All done!</h1>
        <p className="text-green-700 text-md font-semibold mb-6">
          Your password has been reset. Go to the login page and check your new password.
        </p>

        {/* Buttons */}
        <Link to='/login'>
        <button className="w-full bg-[#2867B7] text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition cursor-pointer">Back To Login Page</button>
        </Link>
      
      </div>
    </div>
  
  );
};

export default ForgotSuccessMsg