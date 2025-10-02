import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/setNewPassword.module.css';

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
      const response = await axios.post("YOUR_BACKEND_API", { password });
      alert("Password reset successful!");
      console.log("Api data :", response.data);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        <div className={styles.iconWrapper}>
          <div className={styles.icon}>
            <img
              src="https://thumbs.dreamstime.com/b/simple-black-white-padlock-password-protected-icon-393954163.jpg"
              alt="icon"
            />
          </div>
        </div>

        <h2 className={styles.heading}>Set new password</h2>
        <p className={styles.subText}>Must be at least 8 characters</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />

            <label htmlFor="confirmPassword" className={styles.label}>Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>
            Reset password
          </button>
        </form>

        <div className={styles.backToLogin}>
          <a href="/login">← Back to log in</a>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
