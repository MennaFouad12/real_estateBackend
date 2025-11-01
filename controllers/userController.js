import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    
    const token = createToken(user); 
        res.status(200).json({
      token: token,
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const userRole = role && ['user', 'admin'].includes(role) ? role : 'user';

    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword,
      role: "user" 
    });

    await newUser.save();

    const token = createToken(newUser);

    res.status(201).json({ 
      token: token, 
      message: "User registered successfully", 
      success: true,
      user: {
        id: newUser._id,
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}















export const adminRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // ⚠️ Only admin can set role=admin
    const userRole = role === "admin" && req.user.role === "admin" ? "admin" : "user";

    const newUser = new User({ name, email, password: hashedPassword, role: userRole });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: `User created successfully as ${userRole}`,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
       });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
