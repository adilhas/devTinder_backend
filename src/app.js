const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionReqRouter = require("./routes/connectionReq");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionReqRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(8000, () => console.log("Server running..."));
  })
  .catch((err) => {
    console.log("Databse connection failed...");
  });
