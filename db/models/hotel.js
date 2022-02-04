const mongoose = require("mongoose");

const hotel = mongoose.model("HOTEL", {
  photos_url: String,
  url: String,
  user_rating: {
    type: Map,
    of: String,
  },
  name: String,
  location: {
    type: Map,
  },
  id: String,
});

module.exports = hotel;
