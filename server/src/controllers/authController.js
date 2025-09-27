import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
