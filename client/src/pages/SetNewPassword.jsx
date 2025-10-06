import React, { useState } from 'react';
import styles from '../styles/setNewPassword.module.css';
import API from '../utils/api';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


  const SetNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.info("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.info("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("resetToken");
      const response = await API.post("/auth/reset-password", { newPassword: password, tempToken: token });
      toast.success("Password reset successful!");
      console.log("Api data :", response.data);
      setConfirmPassword("");
      setPassword("");
      navigate('/forgotSuccessMsg')

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error resetting password");
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
