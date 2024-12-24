// shaikskhdev
// 0AeJYcLvkSnf8juG

import mongoose from "mongoose";

const CONNECTION_STRING =
  "mongodb+srv://shaikskhdev:0AeJYcLvkSnf8juG@cluster0.eqjyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectToDataBase = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("connected successfully!");
  } catch (error) {
    console.log("Error connecting to server:", error);
    throw error;
  }
};

connectToDataBase();
