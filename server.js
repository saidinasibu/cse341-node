const express = require('express');
const mongodb = require('./data/database');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5500;

// MIDDLEWARE
app.use(bodyparser.json());

// CORS HEADERS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// ROUTES
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error("❌ Failed to initialize database:", err);
  } else {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log("📦 MongoDB connected");
    });
  }
});
