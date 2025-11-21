// lib/mongodb.js
import { MongoClient } from "mongodb";

export default async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        return client.db("portfolio");  
    } catch (error) {
        console.error("Failed to connect to the database", error);
        throw error;
    }
}
