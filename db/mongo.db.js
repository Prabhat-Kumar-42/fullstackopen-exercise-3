const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected to db successfully");
  } catch (error) {
    console.log(`error: ${err.message}`);
    console.log(`connection to db failed`);
  }
};
module.exports = { connectMongo };
