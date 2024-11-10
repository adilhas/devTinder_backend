const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req?.body);

  try {
    await user.save();
    res.send("User added sucessfully.");
  } catch (err) {
    res.status(400).send("Error saivng user : " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const { emailId } = req.body;

  try {
    const user = await User.findOne({ emailId });
    !user ? res.status(400).send("User not found") : res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.patch("/user", async (req, res) => {
  const { userId } = req.body;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data);
    res.send("User updated successfully.");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
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
