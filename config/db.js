const mongoose = require('mongoose');
// Access to env variables

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB connected');

    } catch (error) {
        console.log(error);
        process.exit(1); // Stop App
    }
}

module.exports = connectDB;