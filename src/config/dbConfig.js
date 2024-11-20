import { MongoClient } from 'mongodb';

export default async function connectToDatabase(stringConexion) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexion);
        console.log('Connecting to MongoDB...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB.');

        return mongoClient;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit();
    }
}