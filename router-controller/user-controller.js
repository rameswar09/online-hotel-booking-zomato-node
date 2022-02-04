const shortid = require("shortid");

const { USER, HOTEL_BOOK } = require("../db/models/index");
const {
  generateAuthToken,
  createHashPassword,
  checkUserPassword,
  makeResponse,
} = require("../utils/app-utils");

const checkUser = async (userDetails) => {
  const existingUser = {
    isUserExist: false,
    user: {},
  };
  const query = {
    email: userDetails.email,
  };
  try {
    const user = await USER.findOne(query);
    if (user) {
      existingUser.isUserExist = true;
      existingUser.user = user;
    }
    return existingUser;
  } catch (e) {
    console.log("Error while checkUser - " + e);
  }
};
const makeUserRecord = async (userDetails) => {
  const newUser = {
    code: shortid.generate(),
    name: userDetails.name || "",
    email: userDetails.email || "",
    password: userDetails.password,
    tokens: [],
  };
  await createHashPassword(newUser);
  return generateAuthToken(newUser);
};

const userLogin = async (req, res) => {
  const reqUserBody = req.body;
  try {
    const { isUserExist, user } = await checkUser(reqUserBody);
    if (!isUserExist) {
      return makeResponse("User is not exist. Please sign up", {}, 200, res);
    }
    const isValidPassword = await checkUserPassword(user, reqUserBody.password);
    if (isValidPassword) {
      return makeResponse("User is valid ", user, 200, res);
    }
    return makeResponse("Invalid Password", {}, 401, res);
  } catch (e) {
    console.log("Error while userLogin -" + err);
    return makeResponse("Error while userLogin", err.stack, 500, res);
  }
};

const userSignUp = async (req, res) => {
  const reqUserBody = req.body;
  const { isUserExist, user } = await checkUser(reqUserBody);
  if (isUserExist) {
    return makeResponse("User is already exist. Please login", user, 200, res);
  }
  try {
    let newUser = await makeUserRecord(reqUserBody);
    newUser = new USER(newUser);
    newUser = await newUser.save();
    return makeResponse("User successfully created", newUser, 200, res);
  } catch (err) {
    console.log("Error while userSignUp -" + err);
    return makeResponse("Error while userSignUp", err.stack, 500, res);
  }
};

const bookHotel = async (req, res) => {
  try {
    const reqBody = req.body;
    reqBody.id = shortid.generate();
    let newBooking = new HOTEL_BOOK(reqBody);
    newBooking = await newBooking.save();
    return makeResponse("Successfully booked ", newBooking, 200, res);
  } catch (err) {
    console.log("Error while bookHotel" + err);
    return makeResponse("Error while booking hotel", err.stack, 500, res);
  }
};
const getUserBookedHotel = async (req, res) => {
  const user_id = req.params.user_id || "";
  if (!user_id) return makeResponse("User id needed", {}, 500, res);
  const hotelStatus = req.query.closed === "true" ? true : false;
  const query = {
    user_id,
    status: hotelStatus,
  };
  try {
    const hotels = await HOTEL_BOOK.find(query).lean();
    if (!hotels || hotels.length === 0)
      return makeResponse(
        `No hotels found for user-id ${user_id}`,
        hotels,
        200,
        res
      );
    return makeResponse("Successfully found hotels", hotels, 200, res);
  } catch (err) {
    console.log("Error while getUserBookedHotel" + err);
    return makeResponse(
      "Error while finding booked hotel",
      err.stack,
      500,
      res
    );
  }
};

const updateBookedHotel = async (req, res) => {
  const reqBody = req.body;
  const bookingId = reqBody.id;
  const query = {
    id: bookingId,
  };
  try {
    const updateBookingHotel = await HOTEL_BOOK.updateOne(
      query,
      reqBody
    ).lean();
    return makeResponse("Successfully updated ", updateBookedHotel, 200, res);
  } catch (err) {
    console.log("Error while updateBookedHotel" + err);
    return makeResponse("Error while update booked hotel", err.stack, 500, res);
  }
};

module.exports = {
  userLogin,
  userSignUp,
  bookHotel,
  getUserBookedHotel,
  updateBookedHotel,
};
