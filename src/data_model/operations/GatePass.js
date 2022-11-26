"use strict";

const GatePass = require("../models/GatePass");
const _ = require("lodash");
const { isNumber, isEmpty } = require("lodash");
const ResourceNotFoundError = require("../../common/ResourceNotFoundError");

async function createGatePass(req, res, next) {
  let data = req.body;
  if (!data || _.isEmpty(data)) {
    return null;
  }

  try {
    await GatePass.create(data);
    return res.json({
      status: true,
      message: "Successfully Created GatePass",
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function updateGatePass(req, res, next) {
  let data = req.body;
  let query = { id: req.params.id };
  const existingGatePass = await GatePass.findOne({ where: query });
  if (isEmpty(existingGatePass)) {
    throw new ResourceNotFoundError("GatePass doesn't exist for given id");
  }
  try {
    await GatePass.update(data, { returning: true, where: query });
    return res.json({
      status: true,
      message: "Successfully Updated GatePass",
    });
  } catch (err) {
    screenY;
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}
async function deleteGatePass(req, res, next) {
  let query = { id: req.params.id };
  if (!query) {
    return null;
  }
  try {
    await GatePass.destroy({ where: query });
    return res.json({
      status: true,
      message: "Successfully Deleted GatePass",
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getAllGatePass(req, res, next) {
  try {
    let response = await GatePass.findAll();
    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getFilteredGatePass(req, res, next) {
  let response = await GatePass.findOne({ where: query });
  return res.json(response);
}

module.exports = {
  createGatePass,
  updateGatePass,
  deleteGatePass,
  getAllGatePass,
  getFilteredGatePass,
};
