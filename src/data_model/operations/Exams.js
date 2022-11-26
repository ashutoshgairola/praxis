"use strict";

const Exams = require("../models/Exams");
const _ = require("lodash");
const { isNumber, isEmpty } = require("lodash");
const ResourceNotFoundError = require("../../common/ResourceNotFoundError");

async function createExam(req, res, next) {
  let data = req.body;
  if (!data || _.isEmpty(data)) {
    return null;
  }

  try {
    await Exams.create(data);
    return res.json({
      status: true,
      message: "Successfully Created Exam",
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function updateExam(req, res, next) {
  let data = req.body;
  let query = { id: req.params.id };
  const existingExam = await Exams.findOne({ where: query });
  if (isEmpty(existingExam)) {
    throw new ResourceNotFoundError("Exam doesn't exist for given id");
  }
  try {
    await Exams.update(data, { returning: true, where: query });
    return res.json({
      status: true,
      message: "Successfully Updated Exam",
    });
  } catch (err) {
    screenY;
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}
async function deleteExam(req, res, next) {
  let query = { id: req.params.id };
  if (!query) {
    return null;
  }
  try {
    await Exams.destroy({ where: query });
    return res.json({
      status: true,
      message: "Successfully Deleted Exam",
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getAllExams(req, res, next) {
  try {
    let response = await Exams.findAll();
    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getFilteredExams(req, res, next) {
  let response = await Exams.findOne({ where: query });
  return res.json(response);
}

module.exports = {
  createExam,
  updateExam,
  deleteExam,
  getAllExams,
  getFilteredExams,
};
