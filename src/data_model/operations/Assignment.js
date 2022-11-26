"use strict";

const Assignments = require("../models/Assignments");
const _ = require("lodash");
const { isNumber, isEmpty } = require("lodash");
const ResourceNotFoundError = require("../../common/ResourceNotFoundError");

async function createAssignment(req, res, next) {
  let data = req.body;
  if (!data || _.isEmpty(data)) {
    return null;
  }

  try {
    await Assignments.create(data);
    return res.json({ status: true, message: "Successfully Created Assignment" });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function updateAssignment(req, res, next) {
  let data = req.body;
  let query = { id: req.params.id };
  const existingAssignment = await Assignments.findOne({ where: query });
  if (isEmpty(existingAssignment)) {
    throw new ResourceNotFoundError("Assignment doesn't exist for given id");
  }
  try {
    await Assignments.update(data, { returning: true, where: query });
    return res.json({ status: true, message: "Successfully Updated Assignment" });
  } catch (err) {
    screenY;
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}
async function deleteAssignment(req, res, next) {
  let query = { id: req.params.id };
  if (!query) {
    return null;
  }
  try {
    await Assignments.destroy({ where: query });
    return res.json({ status: true, message: "Successfully Deleted Assignment" });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getAllAssignments(req, res, next) {
  try {
    let response = await Assignments.findAll();
    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}


async function getFilteredAssignment(req, res, next) {
  let response = await Assignments.findOne({ where: query });
  return res.json(response);
}

module.exports = {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getAllAssignments,
  getFilteredAssignment,
};
