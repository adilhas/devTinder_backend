const express = require("express");
const connectionReqRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

connectionReqRouter.post("/sendConnectionReq", userAuth, async (req, res) => {
  const user = req.user;

  res.send(user.firstName + " sent connection request");
});

module.exports = connectionReqRouter;
