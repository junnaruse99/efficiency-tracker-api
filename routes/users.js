// Routes for creating users
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { check } = require('express-validator');


// Create a user
// Endpoint: api/users
router.post('/',
    [
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password must contain at least 6 characters').isLength( { min: 6} )
    ],
    userController.createUser
);

// Update the user
router.put('/:email',
    [
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password must contain at least 6 characters').isLength( { min: 6} )
    ],
    userController.updateUser
)


module.exports = router;