import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("tinyى"));

app.get("/", (req, res) => {
  res.send("Hello osos");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
