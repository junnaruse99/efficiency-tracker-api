const User = require('../model/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {

    // Check if there were any errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        console.log("POST /api/auth 400");
        console.log(errors.array());
        return res.status(400).json( { errors: errors.array() } );
    }

    // Extract email and password from email and password
    const { email, password } = req.body;

    try {
        // Check if the user is registered
        let user = await User.findOne( { email });
        if(!user) {
            console.log("POST /api/auth 400");
            console.log("The email is not registered");
            return res.status(400).json({ msg: "The email is not registered "});
        }

        // Check password
        const correctPass = await bcryptjs.compare(password, user.password);
        if(!correctPass) {
            console.log("POST /api/auth 400");
            console.log("Incorrect password");
            return res.status(400).json({ msg: "Incorrect password "});
        }

        // If everything is correct
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

        console.log("POST /api/auth 200");

        
    } catch (error) {
        res.status(400).json( { msg: 'There was an error' } );
        console.log("POST /api/auth 400");
        console.log(error);
    }

}

// Get what user is authenticated
exports.authenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json( { user });
        console.log("GET /api/auth 200");

    } catch (error) {
        console.log(error);
        res.status(500).json( { msg:'There was an error' } );
        console.log("GET /api/auth 500");

    }
}