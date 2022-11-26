"use strict";

const Fees = require("../models/Fees");
const _ = require("lodash");
const { isNumber, isEmpty } = require("lodash");
const ResourceNotFoundError = require("../../common/ResourceNotFoundError");

async function createFee(req, res, next) {
  let data = req.body;
  if (!data || _.isEmpty(data)) {
    return null;
  }

  try {
    await Fees.create(data);
    return res.json({
      status: true,
      message: "Successfully Created Fee",
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function updateFee(req, res, next) {
  let data = req.body;
  let query = { id: req.params.id };
  const existingFee = await Fees.findOne({ where: query });
  if (isEmpty(existingFee)) {
    throw new ResourceNotFoundError("Fee doesn't exist for given id");
  }
  try {
    await Fees.update(data, { returning: true, where: query });
    return res.json({
      status: true,
      message: "Successfully Updated Fee",
    });
  } catch (err) {
    screenY;
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}
async function deleteFee(req, res, next) {
  let query = { id: req.params.id };
  if (!query) {
    return null;
  }
  try {
    await Fees.destroy({ where: query });
    return res.json({
      status: true,
      message: "Successfully Deleted Fee",
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getAllFees(req, res, next) {
  try {
    let response = await Fees.findAll();
    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getFilteredFee(req, res, next) {
  let response = await Fees.findOne({ where: query });
  return res.json(response);
}

module.exports = {
  createFee,
  updateFee,
  deleteFee,
  getAllFees,
  getFilteredFee,
};
