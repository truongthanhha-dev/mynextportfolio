// lib/mongodb.js
import { MongoClient } from "mongodb";

// MongoDB native client helper.
// Một số phần có thể dùng trực tiếp database object thay vì đi qua Mongoose model.
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
