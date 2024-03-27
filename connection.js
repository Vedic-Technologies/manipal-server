const mongoose = require('mongoose');

async function connectMongoDb(URI) {
mongoose.connect(URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        // Your code to interact with MongoDB goes here
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });
}

module.exports = {
    connectMongoDb,
}