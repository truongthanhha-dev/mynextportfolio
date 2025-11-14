const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb+srv://hatruongdev_user:HT2hD7KRyz8glIJ3@hatruongne.yybuwyp.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Hatruongne";

async function testConnection() {
  try {
    console.log("Trying to connect...");
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      ssl: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("Connected to MongoDB:", conn.connection.host);
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

testConnection();
