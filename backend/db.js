const mongoose = require('mongoose');

const mongoDBURL = "mongodb://127.0.0.1:27017/iNotebookDatabase?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4";
const connectToMongo = mongoose.connect(mongoDBURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = connectToMongo;