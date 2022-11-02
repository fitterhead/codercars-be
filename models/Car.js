
const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  make: {
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
