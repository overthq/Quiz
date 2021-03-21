import mongoose from "mongoose";

mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;

db.once("connected", () => {
  console.log("Connected to MongoDB!");
});

db.on("error", (error) => {
  console.error(error);
});
