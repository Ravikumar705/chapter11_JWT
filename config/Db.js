import mongoose from "mongoose";
import "dotenv/config";

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.log(`error while database connection : ${error}`);
  }
};

export { DbConnection };
