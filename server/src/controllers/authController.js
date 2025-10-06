import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const otpStore = {};

// Function that creates the user account -------------------------------->
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ msg: "User already exist!!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    }); // All the remaining details in the user schema from a different function

    await newUser.save();

    const token = jwt.sign(
      { uid: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "2D" }
    );

    res.status(201).json({
      msg: "User created successfully! ✅",
      token,
      user: { uid: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Function to authenticate and log the user in -------------------------->
export const logUserIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(400).json({ msg: "User doesn't exist ❌" });

    const isMatching = await bcrypt.compare(password, existingUser.password);

    if (!isMatching)
      return res
        .status(401)
        .json({ msg: "Invalid credentials, not authorized 🚫" });

    const token = jwt.sign(
      {
        uid: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2D" }
    );
    res.status(200).json({
      msg: "Logged User in successfully ✅",
      token,
      user: {
        uid: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Function that will be used for Forgot Password | sends OTP ---------------->
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
    otpStore[email] = {
      otp,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    // Send OTP email
    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP to reset password is: ${otp}. It expires in 5 minutes.`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





// Function to verify the OTP and generate a temporary token to be used for setting a new password ------------>
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore[email];
    if (!record) return res.status(400).json({ message: "OTP not requested" });
    if (record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    if (Date.now() > record.expires)
      return res.status(400).json({ message: "OTP expired" });

    // OTP is valid → generate temporary token for password reset
    const tempToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.json({ message: "OTP verified Successful ", tempToken:tempToken });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resendOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
    otpStore[email] = {
      otp,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    // Send OTP email
    await sendEmail({
      to: email,
      subject: "Password Resend OTP",
      text: `Your OTP to reset password is: ${otp}. It expires in 5 minutes.`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Function to set new password ------------------------------------------->
export const resetPassword = async (req, res) => {
  try {
    const { tempToken, newPassword } = req.body;

    // Verifying the token
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    const email = decoded.email;
    
    // Checking the user
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({msg:"User not found ⛔"})
    
    // Updating password 
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    // Remove OTP from store
    delete otpStore[email];

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
