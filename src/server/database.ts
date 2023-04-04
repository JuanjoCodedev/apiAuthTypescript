import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "./../../config.env") });

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.3bkjgxc.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

const databaseConexion = async () => {
  await mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Database connected MongoDb"))
    .catch((e) => console.log("Error", e));
};

export default databaseConexion;
