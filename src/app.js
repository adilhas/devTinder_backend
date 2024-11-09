const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Samuel",
    lastName: "Jackson",
    emailId: "sam@mail.com",
    gender: "male",
    password: "test1234",
  });
  try {
    await user.save();
    res.send("User added sucessfully.");
  } catch (err) {
    res.status(400).send("Error saivng user : " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(8000, () => console.log("Server running..."));
  })
  .catch((err) => {
    console.log("Databse connection failed...");
  });
