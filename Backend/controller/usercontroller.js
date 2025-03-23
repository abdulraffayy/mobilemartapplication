const User = require("../models/LoginModel");
const jwt = require('jsonwebtoken');

// Signup function
exports.signup = async (req, res) => {
  const { fullName, username, email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Create a new user
    const newUser = new User({ fullName, username, email, password });
    await newUser.save(); // Save the user to the database

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle duplicate email or username errors
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email or username already exists" });
    }
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' }); 
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' }); 
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    

    return res.json({ email: user.email, token: token }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' }); 
  }
};




