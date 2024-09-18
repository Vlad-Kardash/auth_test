import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.NEXTMONGO_URL);
    if (connection.readyState === 1) {
      console.log("подключились к монго");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log("ошибка подключения к монго", error);
    return Promise.reject(error);
  }
};
