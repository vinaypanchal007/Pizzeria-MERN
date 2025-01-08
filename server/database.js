const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect('mongodb://127.0.0.1:27017/Trial');
};

module.exports = connectDB;
