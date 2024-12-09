const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid.");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password should be minimum 8 character long and should contain atleast 1 lowercase, 1 uppercase, l number, and 1 symbol."
    );
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
