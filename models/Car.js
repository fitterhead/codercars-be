// {
//   "make": "BMW",
//   "model": "haha",
//   "release_date": 1999,
//   "transmission_type": "MANUAL",
//   "price": 3232,
//   "size": "Compact",
//   "style": "xsdsdsda"
// }
const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  // isDeleted: { type: Boolean, defaults: false },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  release_date: {
    type: Number,
    required: true,
  },
  transmission_type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
});

carSchema.pre(/^find/, function (next) {
  if (!("_conditions" in this)) return next();
  if (!("isDeleted" in carSchema.paths)) {
    delete this["_conditions"]["all"];
    return next();
  }
  if (!("all" in this["_conditions"])) {
    this["_conditions"].isDeleted = false;
  } else {
    delete this["_conditions"]["all"];
  }
  next();
});

const Cars = mongoose.model("Cars", carSchema);

module.exports = Cars;
