const mongoose = require("mongoose");

const mongoUrl = "mongodb://127.0.0.1:27017/online-restaurant";

mongoose.connect(mongoUrl, (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
});
