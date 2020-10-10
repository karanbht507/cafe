const mongoose = require('mongoose');

const Cafe = mongoose.model('Cafe', {
  name: {
    type: String,
  },
  description: {
    type: String
  },
  address: {
    type: String
  },
  cafeImage: {
    type: String
  },
  cafeTimings: {
    type: String
  },
  cafeRating: {
    type: String
  },
  costForTwo: {
    type: String
  },
  location: {
    type: String
  }
})

module.exports = Cafe;