"use strict";

const Class = require("../models/Class");
const _ = require("lodash");
const { isNumber, isEmpty } = require("lodash");
const ResourceNotFoundError = require("../../common/ResourceNotFoundError");

async function createClass(req, res, next) {
  let data = req.body;
  if (!data || _.isEmpty(data)) {
    return null;
  }

  try {
    await Class.create(data);
    return res.json({
      status: true,
      message: "Successfully Created Class",
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function updateClass(req, res, next) {
  let data = req.body;
  let query = { id: req.params.id };
  const existingClass = await Class.findOne({ where: query });
  if (isEmpty(existingClass)) {
    throw new ResourceNotFoundError("Class doesn't exist for given id");
  }
  try {
    await Class.update(data, { returning: true, where: query });
    return res.json({
      status: true,
      message: "Successfully Updated Class",
    });
  } catch (err) {
    screenY;
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}
async function deleteClass(req, res, next) {
  let query = { id: req.params.id };
  if (!query) {
    return null;
  }
  try {
    await Class.destroy({ where: query });
    return res.json({
      status: true,
      message: "Successfully Deleted Class",
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getAllClass(req, res, next) {
  try {
    let response = await Class.findAll();
    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getFilteredClass(req, res, next) {
  let response = await Class.findOne({ where: query });
  return res.json(response);
}

module.exports = {
  createClass,
  updateClass,
  deleteClass,
  getAllClass,
  getFilteredClass,
};
