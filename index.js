// import not supported
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config({ path: 'variables.env' });

// Creating server
const app = express();

// Connect to db
connectDB();

// Enable express.json (replace body parser) for reading user input
// Have to send header as application/json
app.use( express.json({ extended: true }) );

// App port (Can be any port but 3000, since thats for client)
const PORT = process.env.PORT || 4000;

// Import routes
app.use('/api/users', require('./routes/users'))

// Run app
app.listen(PORT, () => {
    console.log(`The server is running in port ${PORT}`);
});