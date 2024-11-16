const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();


// MongoDB connection URL
const mongoURI = process.env.MONGO_URI;

// Connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


// Establish the connection
mongoose.connect(mongoURI, options)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) =>  {
        console.error('Error connecting to MongoDB:', error.message);

        // Handle specific error conditions
        if (error.name === 'MongoNetworkError') {
            console.error('Network error occurred. Check your MongoDB server.');
        } else if (error.name === 'MongooseServerSelectionError') {
            console.error('Server selection error. Ensure'
                + ' MongoDB is running and accessible.');
        } else {
            // Handle other types of errors
            console.error('An unexpected error occurred:', error);
        }
    });

const db = mongoose.connection;


module.exports = db;

// db.on('error', (error) => {
//     console.error('MongoDB connection error:', error);
// });



// db.on('disconnected', () => {
//     console.log('Disconnected from MongoDB');
// });
