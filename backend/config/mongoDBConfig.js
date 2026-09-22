const mongoose = require("mongoose");

const mongoDBConfig = async () => {
  return mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("mongoDB connected");
    })
    .catch((error) => {
      console.log("mongoDB connection error:", error);
    });
};

module.exports = mongoDBConfig;
