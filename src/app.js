const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validateSignUpData");
const bycrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bycrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added sucessfully.");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const isPasswordValid = await bycrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user?._id }, "devTinder@secret", {
        expiresIn: "7d",
      });

      res.cookie("token", token);
      res.send("Login successfull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req?.user;
    res.send(user);
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
