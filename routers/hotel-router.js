const express = require("express");
const router = new express.Router();

const {
  getAllHotels,
  getTopHotels,
  getHotel,
  getAllCities,
  getCityHotel,
} = require("../router-controller/hote-controller");

router.get("/all-hotel", getAllHotels);
router.get("/top-hotel", getTopHotels);
router.get("/get-hotel/:id", getHotel);
router.get("/get-all-city", getAllCities);
router.get("/city", getCityHotel);

module.exports = router;
