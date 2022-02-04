const mongoose = require("mongoose");

const bookHotel = mongoose.model("BOOKING_HOTEL", {
  id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  booking_details: {},
  hotel_id: {
    type: String,
    required: true,
  },
  hotel_name: {
    type: String,
    required: true,
  },
  address: {},
  status: {
    type: Boolean, // close or open
    default: false,
  },
  time: { type: Date, default: Date.now },
});

module.exports = bookHotel;
