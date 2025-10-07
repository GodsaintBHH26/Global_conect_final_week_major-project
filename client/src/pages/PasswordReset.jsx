
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/passwordReset.module.css";
import API from "../utils/api";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      toast.info("Please enter all 4 digits!");
      return;
    }
    try {
      const response = await API.post("/auth/verify-otp", { otp: otpValue, email: email, });
      console.log("verifyData", response)
      localStorage.setItem("resetToken", response.data.tempToken);
      toast.success(response.data.message || "OTP verified successfully ");
      setOtp(["", "", "", ""]);
      navigate("/setNewPassword")

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid OTP ");
    }
  };


  const handleResend = async () => {
    try {
      const response = await API.post("/auth/resend-otp", { email: email });
      toast.success(response.data.message || "OTP resent successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to resend OTP.");
    }finally{
    setTimeout(() => setResendDisabled(false), 60000); // 60 sec cool-down
  }
  };


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <div className={styles.icon}>
            <img
              src="https://media.istockphoto.com/id/1257404830/vector/email-marketing-icon-vector-graphics.jpg?b=1&s=170x170&k=20&c=G4QGVrVmvedokwCf6-QPyHZ1Q2KEZx0x6VoBqbwTZ6Y="
              alt="image"
              className="w-[100%] h-[100%]"
            />
          </div>
        </div>

        <h2 className={styles.heading}>Password reset</h2>
        <p className={styles.subText}>
          We sent a code to <span>{email}</span>
        </p>

        <div className={styles.otpWrapper}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className={styles.otpInput}
              required
            />
          ))}
        </div>

        <button onClick={handleSubmit} className={styles.submitBtn}>
          Submit OTP
        </button>

        <p className={styles.resendText}>
          Didn’t receive the email?{" "}
          <button onClick={handleResend}>Click to resend</button>
        </p>

        <div className={styles.backBox}>
         <Link to="/login" className={styles.backLink}>
          <button className={styles.backBtn}>← Back to log in</button>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default PasswordReset;
