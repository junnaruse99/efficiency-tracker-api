const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Read token from header
    const token = req.header('x-auth-token');

    // Check if there is no token
    if(!token) {
        return res.status(401).json({ msg: "You do not have access" });
    }

    // Validate token
    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token not valid' });
    }
}