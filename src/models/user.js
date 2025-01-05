const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address :" + value);
        }
      },
    },
    password: { type: String, required: true, min: 8 },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} data is not valid.`,
      },
      // validate(value) {
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Gender data is not valid.");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid url :" + value);
        }
      },
    },
    about: { type: String, default: "This is the default about." },
    skills: { type: [String] },
  },
  { timestamps: true }
);

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user?._id }, "devTinder@secret", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (inputPassword) {
  const user = this;
  const hashPassword = user.password;
  const isPasswordValid = await bcrypt.compare(inputPassword, hashPassword);

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
