const express = require('express');
const router = express.Router();
const adminAuthController = require('../controller/adminAuthController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Admin login route
router.post('/login', adminAuthController.login);

// Protected admin routes
router.use(verifyToken, isAdmin);

// Add other admin routes here
// router.get('/dashboard', adminController.getDashboard);
// router.get('/users', adminController.getUsers);
// etc.

module.exports = router; 