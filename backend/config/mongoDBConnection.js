const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    await mongoose.connect(MONGODB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Database error:", error.message);
  }
};

module.exports = dbConnection;
