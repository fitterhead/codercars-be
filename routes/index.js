const { sendResponse, AppError } = require("../helpers/utils.js");

const express = require("express");
const router = express.Router();

router.get("/coder_cars/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    //turn on to test error handling
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(
        res,
        200,
        true,
        { data: "template" },
        null,
        "template success"
      );
    }
  } catch (err) {
    next(err);
  }
});

// CAR
const carAPI = require("./car.api");
router.use("/cars", carAPI);

// router.get("/", (req, res, next) => {
//   console.log("aaa");
//   res.send("blah blah");
// });

module.exports = router;
