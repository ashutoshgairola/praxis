"use strict";

const Users = require("../models/Users");
const _ = require("lodash");
const { isNumber, isEmpty } = require("lodash");
const ResourceNotFoundError = require("../../common/ResourceNotFoundError");

async function createUser(req, res, next) {
  let data = req.body;
  if (!data || _.isEmpty(data)) {
    return null;
  }

  try {
    await Users.create(data);
    return res.json({ status: true, message: "Successfully Created User" });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function updateUser(req, res, next) {
  let data = req.body;
  let query = { id: req.params.id };
  const existingUser = await Users.findOne({ where: query });
  if (isEmpty(existingUser)) {
    throw new ResourceNotFoundError("User doesn't exist for given id");
  }
  try {
    await Users.update(data, { returning: true, where: query });
    return res.json({ status: true, message: "Successfully Updated User" });
  } catch (err) {
    screenY;
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}
async function deleteUser(req, res, next) {
  let query = { id: req.params.id };
  if (!query) {
    return null;
  }
  try {
    await Users.destroy({ where: query });
    return res.json({ status: true, message: "Successfully Deleted User" });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getAllUsers(req, res, next) {
  try {
    let response = await Users.findAll();
    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.json({ status: false, message: err.message });
  }
}

async function getUsers(req, res, next) {
  var offset = page_no * page_size - page_size;
  var limit = page_size;
  let response = await Users.findAll({
    limit: limit,
    offset: offset,
    raw: true,
  });
  let itemCounts = await Ddays.count({
    where: { userId: Number(userId) },
    raw: true,
  });
  console.log(itemCounts / page_size, "pagenation@##@#@#@#@##@###@#@@##@#@#@#");
  let result = {};
  result["page"] = {
    curret_page: page_no,
    has_next: itemCounts / page_size > page_no,
    has_previous: page_no > 1,
    total_item: itemCounts,
    size: page_size,
  };
  result["item"] = response;
  console.log(response);
  return res.json(result);
}

async function getUsersById(req, res, next) {
  let id = req.params.id;
  let response = await Users.findOne({ where: { id: id } });
  return res.json(response);
}

async function verifyUser(mobNumber) {
  let query = { mobile: mobNumber };
  let response = {};
  const existingUser = await Users.findOne({ where: query, raw: true });
  if (isEmpty(existingUser)) {
    return { status: false, message: "new registration" };
  } else {
    try {
      await Users.update(
        { mobileStatus: "verified" },
        { returning: true, where: query }
      );
      response = {
        status: true,
        message: "Successfully Updated User",
        User: existingUser,
      };
    } catch (err) {
      screenY;
      console.log(err);
      return res.json({ status: false, message: err.message });
    }
    return response;
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUsers,
  getUsersById,
  verifyUser,
};
