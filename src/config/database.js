const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://adilhashmi:Test12345@nodecluster.o4ixe.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
