
 // Execute this file for first time to insert raw data into mongo
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
let rawdata = fs.readFileSync("./public/hotel.json");
let hotel = JSON.parse(rawdata);

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  const dbo = db.db("online-restaurant");
  dbo.collection("hotels").insertMany(hotel, function (err, res) {
    if (err) throw err;
    console.log("documents inserted");
    db.close();
  });
});
