"use strict";

const express = require("express");

const { body } = require("express-validator");

const {
  updateUser,
  deleteUser,
  getUsersById,
  createUser,
  getAllUsers,
} = require("../../../../../data_model/operations/Users");

const { sendOtp, verifyOtp } = require("../handlers/otpVerfication");

const CoreRoute = express.Router();

// User Routes

CoreRoute.post("/v1.0/user", createUser);

CoreRoute.put("/v1.0/user/:id", updateUser);

CoreRoute.delete("/v1.0/user/:id", deleteUser);

CoreRoute.get("/v1.0/user", getAllUsers);

CoreRoute.get("/v1.0/user/:id", getUsersById);

// otp service

CoreRoute.post("/v1.0/sendOtp", sendOtp);

CoreRoute.post("/v1.0/verifyOtp", verifyOtp);

module.exports = CoreRoute;
