const { HOTEL } = require("../db/models/index");
const { makeResponse } = require("../utils/app-utils");

const getAllHotels = async (req, res) => {
  try {
    const allHotel = await HOTEL.find({}).lean();
    return makeResponse("Successfully", allHotel, 200, res);
  } catch (err) {
    console.log("Error while getAllHotels" + err);
    return makeResponse("Error while get all hotel", err.stack, 500, res);
  }
};

const getTopHotels = async (req, res) => {
  try {
    const query = { "user_rating.aggregate_rating": "4.9" }; // hardcoded
    const allHotel = await HOTEL.find(query).limit(20).lean();
    return makeResponse("Successfully", allHotel, 200, res);
  } catch (err) {
    console.log("Error while getTopHotels" + err);
    return makeResponse(
      "Error while get top rating hotel",
      err.stack,
      500,
      res
    );
  }
};
const getHotel = async (req, res) => {
  const hotelId = req.params.id || "";
  if (!hotelId) {
    return makeResponse("Hotel Id needed", {}, 500, res);
  }
  const query = { id: hotelId };
  try {
    const hotel = await HOTEL.findOne(query).lean();
    if (!hotel) {
      return makeResponse(`No Hotel for this id-${hotelId}`, {}, 500, res);
    }
    return makeResponse(
      "Successfully found the hotel details",
      hotel,
      200,
      res
    );
  } catch (err) {
    console.log("Error while getHotel" + err);
    return makeResponse("Error", err.stack, 500, res);
  }
};

const getAllCities = async (req, res) => {
  try {
    const allCities = await HOTEL.distinct("location.city").lean();
    return makeResponse("Successfully found all cities", allCities, 200, res);
  } catch (err) {
    console.log("Error while getAllCities" + err);
    return makeResponse("Error finding all cities", err.stack, 500, res);
  }
};

const getCityHotel = async (req, res) => {
  const cityName = req.query.city_name;
  if (!cityName) {
    return makeResponse("City name needed", {}, 500, res);
  }
  try {
    const query = { "location.city": cityName };
    const allCityHotels = await HOTEL.find(query).lean();
    if (!allCityHotels || allCityHotels.length === 0) {
      return makeResponse(
        `No hotel found for this clity -${cityName}`,
        {},
        500,
        res
      ); // it should be 204 but for testing made as 500
    }
    return makeResponse("Successfully found hotels", allCityHotels, 200, res);
  } catch (err) {
    console.log("Error while getCityHotel" + err);
    return makeResponse("Error while finding city hotel", err.stack, 500, res);
  }
};
module.exports = {
  getAllHotels,
  getTopHotels,
  getHotel,
  getAllCities,
  getCityHotel,
};
