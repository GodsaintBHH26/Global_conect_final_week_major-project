import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";

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
    res
      .status(200)
      .json({
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

// 📌 Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `You requested a password reset. Click the link to reset:\n\n${resetUrl}\n\nIf you did not request this, please ignore.`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash token and compare
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};