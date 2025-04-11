const User = require("../models/LoginModel");
const jwt = require('jsonwebtoken');

// Signup function
exports.signup = async (req, res) => {
  const { fullName, username, email, password, confirmPassword, role } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if trying to create admin and admin already exists
    if (role === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }
    }

    // Create a new user
    const newUser = new User({ 
      fullName, 
      username, 
      email, 
      password,
      role: role || 'user' // Default to user if role not specified
    });
    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully",
      role: newUser.role
    });
  } catch (error) {
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

    const token = jwt.sign({ 
      id: user._id,
      role: user.role 
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    return res.json({ 
      email: user.email, 
      role: user.role,
      token: token 
    }); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' }); 
  }
};

// Middleware to check if user is admin
exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};




