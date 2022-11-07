
const { sendResponse, AppError } = require("../helpers/utils.js");
const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};
const allowUpdate = [
  "make",
  "model",
  "release_date",
  "transmission_type",
  "price",
  "size",
  "style",
];
/* -------------------------------------------------------------------------- */
/*                                Create a car                                */
/* -------------------------------------------------------------------------- */
carController.createCar = async (req, res, next) => {
  try {
    const updates = req.body;
    if (!updates) throw new AppError(402, "Bad Request", "Create car Error");
    const updateKeys = Object.keys(updates);
    const notAllow = updateKeys.filter((el) => !allowUpdate.includes(el));
    if (notAllow.length) {
      const exception = new Error(`Update field not allow`);
      exception.statusCode = 401;
      throw exception;
    }
    const created = await Car.create(updates);
    sendResponse(
      res,
      200,
      true,
      { car: created },
      null,
      "Create Car Successfully"
    );
  } catch (err) {
    next(err);
  }
};
/* -------------------------------------------------------------------------- */
/*                                 Get all car                                */
/* -------------------------------------------------------------------------- */
carController.getCars = async (req, res, next) => {
  const query = req.query;
  console.log(query, "query");
  const filter = {};
  try {
    const listOfFound = await Car.find(query)
      .limit(10)
      .skip((query.page - 1) * 10);
    sendResponse(
      res,
      200,
      true,
      { cars: listOfFound, page: 1, total: 1192 },
      null,
      "Get Car List Successfully!"
    );
  } catch (err) {
    next(err);
  }
};
/* -------------------------------------------------------------------------- */
/*                                Update a car                                */
/* -------------------------------------------------------------------------- */
carController.editCar = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    console.log(targetId);
    const updates = req.body;
    if (!updates) throw new AppError(402, "Bad Request", "Create car Error");
    const updateKeys = Object.keys(updates);
    //find update request that not allow
    const notAllow = updateKeys.filter((el) => !allowUpdate.includes(el));
    if (notAllow.length) {
      const exception = new Error(`Update field not allow`);
      exception.statusCode = 401;
      throw exception;
    }
    const options = { new: true };
    //mongoose query
    const updated = await Car.findByIdAndUpdate(targetId, updates, options);
    sendResponse(
      res,
      200,
      true,
      { Car: updated },
      null,
      "Update Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};
/* -------------------------------------------------------------------------- */
/*                                 Delete Car                                 */
/* -------------------------------------------------------------------------- */
carController.deleteCar = async (req, res, next) => {
  const targetId = null;
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Car.findByIdAndDelete(targetId, options);
    sendResponse(
      res,
      200,
      true,
      { Car: updated },
      null,
      "Delete Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};
module.exports = carController;
