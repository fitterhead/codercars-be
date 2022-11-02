const { sendResponse, AppError } = require("../helpers/utils.js");
const mongoose = require("mongoose");
const Car = require("../models/Car");

const carController = {};
/* -------------------------------------------------------------------------- */
/*                                Create a car                                */
/* -------------------------------------------------------------------------- */

carController.createCar = async (req, res, next) => {
  try {
    const info = req.body;
    if (!info) throw new AppError(402, "Bad Request", "Create car Error");
    const created = await Car.create(info);
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
  const filter = {};
  try {
    const listOfFound = await Car.find(filter).limit(10);
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
  const targetId = req.params.id;
  console.log(targetId);
  const updateInfo = req.body;
  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);

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
