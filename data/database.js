// ------------------------------
// 📦 IMPORTS
// ------------------------------
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// ------------------------------
// ⚙️ LOAD ENVIRONMENT VARIABLES
// ------------------------------
dotenv.config();

// ------------------------------
// 🔌 DATABASE CLIENT
// ------------------------------
const uri = process.env.MONGO_URI;
let _db;

// ------------------------------
// 🚀 INITIALIZE DATABASE
// ------------------------------
const initDb = async (callback) => {
  if (_db) {
    console.log("✅ Database already initialized!");
    return callback(null, _db);
  }

  if (!uri) {
    return callback(new Error("❌ MONGO_URI is missing in .env file!"));
  }

  try {
    const client = new MongoClient(uri); // ✅ No options needed in MongoDB v7
    await client.connect();

    _db = client.db(); // Uses default DB from connection string

    console.log("✅ MongoDB connected successfully!");
    callback(null, _db);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    callback(err);
  }
};

// ------------------------------
// 📤 GET DATABASE
// ------------------------------
const getDatabase = () => {
  if (!_db) throw Error("❌ Database not initialized yet!");
  return _db;
};

// ------------------------------
// 📦 EXPORTS
// ------------------------------
module.exports = { initDb, getDatabase };
