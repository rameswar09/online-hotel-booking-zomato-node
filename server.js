const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const { userRouter, hotelRouter } = require("./routers/index");
const serverPort = process.env.port || 3000;
require("./db/mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server
app.use("/user", userRouter);
app.use("/hotel", hotelRouter);
app.listen(serverPort, () => {
  console.log(`Port started on ${serverPort}`);
});
