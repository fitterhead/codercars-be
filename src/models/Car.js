// {
//   "make": "BMW",
//   "model": "haha",
//   "release_date": 1999,
//   "transmission_type": "MANUAL",
//   "price": 3232,
//   "size": "Compact",
//   "style": "xsdsdsda",

//   "isEnabled": true

//   "_updatedAt": "2022-11-08T12:39:35.828Z",
//   "_createdAt": "2022-11-08T12:39:35.828Z",
// }
const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
  {
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
    isEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

carSchema.pre(/^find/, function (next) {

  if (!("_conditions" in this)) return next();

  if (!("isEnabled" in carSchema.paths)) {
    delete this["_conditions"]["all"];
    return next();
  }

  if (!("all" in this["_conditions"])) {
    this["_conditions"].isEnabled = true;
  } else {
    delete this["_conditions"]["all"];
  } 

  next();
});

carSchema.pre(/^count/, function (next) {

  if (!("_conditions" in this)) return next();

  if (!("isEnabled" in carSchema.paths)) {
    delete this["_conditions"]["all"];
    return next();
  }

  if (!("all" in this["_conditions"])) {
    this["_conditions"].isEnabled = true;
  } else {
    delete this["_conditions"]["all"];
  } 

  next();
});

const Cars = mongoose.model("Cars", carSchema);

module.exports = Cars;
