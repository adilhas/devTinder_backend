const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bycrypt = require("bcrypt");
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req?.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} profile edited successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit-password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const isCurrentPasswordValid = await req.user.validatePassword(
      currentPassword
    );

    if (!isCurrentPasswordValid) {
      throw new Error("Invalid password");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error(
        "Password should be minimum 8 character long and should contain atleast 1 lowercase, 1 uppercase, l number, and 1 symbol."
      );
    }

    const newHashedPassword = await bycrypt.hash(newPassword, 10);
    req.user.password = newHashedPassword;
    await req.user.save();
    res.send("Password Updated Successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
