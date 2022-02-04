const express = require("express");
const router = express.Router();

const {
  userLogin,
  userSignUp,
  userLogout,
  bookHotel,
  getUserBookedHotel,
  updateBookedHotel,
} = require("../router-controller/user-controller");

// routers

router.post("/login", userLogin);
router.post("/sign-up", userSignUp);
router.post("/book-hotel", bookHotel);
router.put("/update-booked-hotel/", updateBookedHotel);
router.get("/get-booked-hotels/:user_id", getUserBookedHotel);

module.exports = router;
