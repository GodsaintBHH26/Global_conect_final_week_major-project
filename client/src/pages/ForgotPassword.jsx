
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/forgotPassword.module.css"; // CSS module import
import { toast } from "react-toastify";
import API from "../utils/api.js";
const ForgotPassword = () => {
const [email, setEmail] = useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

         try {

            const response = await API.post('/auth/forgot-password', { email });
            console.log(response.data)
            if (response.data) {
                toast.success("OTP sent Successfully")
                navigate("/passwordReset")
                setEmail("");
            }

        } catch (error) {
            toast.error("Invalid Email")
            console.log(error.message)
        }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageBox}>
        <img
          src="https://img.freepik.com/premium-vector/forgot-password-concept-illustration_114360-1095.jpg"
          alt="image"
        />
      </div>

      <div className={styles.card}>
        {/* Icon */}
        <div className={styles.iconBox}>
          <div className={styles.iconWrapper}>
            <img
              src="https://media.istockphoto.com/id/921664276/vector/mobile-application-for-fingerprint-recognition.jpg?s=612x612&w=0&k=20&c=LU0HlPkgdV-k3Y5AzJ6JjCKQrSk1sr3_VCHcGCntBTU="
              alt="image"
              className={styles.iconImg}
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className={styles.heading}>Forgot password?</h2>
        <p className={styles.subText}>
          No worries, we’ll send you reset instructions.
        </p>

        {/* Email Input */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          {/* Button */}
          <button type="submit" className={styles.button}>
            Send OTP
          </button>
        </form>

        {/* Back to login */}
        <div className={styles.backBox}>
          <Link to="/login" className={styles.backLink}>
            <button className={styles.backBtn}>← Back to log in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
