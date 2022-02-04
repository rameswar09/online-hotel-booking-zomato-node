const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rameswarreddy.project@gmail.com",
    pass: "ramureddy",
  },
});
const checkUserPassword = async (userDoc, reqPassword) => {
  let userPassWord = _.get(userDoc, "password", "");
  const isMatch = await bcrypt.compare(reqPassword, userPassWord);
  return isMatch;
};

const createHashPassword = async (userDoc) => {
  userDoc.password = await bcrypt.hash(userDoc.password, 8);
  return true;
};

const generateAuthToken = (userDoc) => {
  const token = jwt.sign(
    { _id: userDoc.code.toString() },
    "thisismyolinerestaurantbooking"
  );
  userDoc.tokens.push({ token });
  return userDoc;
};
const sendEmailToUser = (email) => {
  var mailOptions = {
    from: "rameswarreddy.project@gmail.com",
    to: "brameswarreddy@gmail.com",
    subject: "Sending Email using Node.js by rameswar reddy",
    text: email + " has joined in your organisation",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const makeResponse = (message, data, statusCode, res) => {
  const responseObject = {
    message,
    data,
  };
  return res.status(statusCode).json(responseObject);
};
module.exports = {
  checkUserPassword,
  createHashPassword,
  generateAuthToken,
  sendEmailToUser,
  makeResponse,
};
