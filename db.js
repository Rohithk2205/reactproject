require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

async function connectToDatabase() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('MongoDB connected successfully');
        return client;
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    } finally {
        console.log("Connected to database...");
    }
}

module.exports = {
    connectToDatabase,
}