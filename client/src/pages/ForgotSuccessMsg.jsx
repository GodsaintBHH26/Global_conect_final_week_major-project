import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ForgotSuccessMsg.module.css';

const ForgotSuccessMsg = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Icon */}
        <div className={styles.iconWrapper}>
          <div className={styles.icon}>
            <img
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWNzZ3d2cWd3bWhuc280bXoyMTc3c2hubG9kYWZ4dzRrNWV3Mmd6MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tf9jjMcO77YzV4YPwE/giphy.gif"
              alt="check logo"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>All done!</h1>
        <p className={styles.message}>
          Your password has been reset. Go to the login page and check your new password.
        </p>

        {/* Button */}
        <Link to="/login">
          <button className={styles.button}>Back To Login Page</button>
        </Link>
      </div>
    </div>
  );
};

export default ForgotSuccessMsg;
