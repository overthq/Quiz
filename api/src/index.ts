import express from "express";
import "config/db";

const app = express();

app.use(express.json());

app.listen(Number(process.env.PORT), () => {
  console.log("Server running on port ", process.env.PORT);
});
