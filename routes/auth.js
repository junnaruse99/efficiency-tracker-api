// Routes for authenticate users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controller/authController')

// Authenticate a user
// Endpoint: api/auth
router.post('/',
    [
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password must contain at least 6 characters').isLength( { min: 6} )
    ],
    authController.authenticateUser
);

module.exports = router;