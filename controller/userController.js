const User = require('../model/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // Check if there were any errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json( { errors: errors.array() } );
    }

    // Extract email and password
    const { email, password } = req.body;

    try {
        // Check if user is unique
        let user = await User.findOne( {email} );

        if(user) {
            return res.status(400).json( { msg: 'The user already exists' } );
        }

        // Create a new user
        user = new User(req.body);

        // Hashing password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        
        // Save user in db
        await user.save();

        // Create and sign the JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // Sign the JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            // Confirmation messagge
            res.json( { token } );
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(400).json( { msg: 'There was an error' } );
    }
}