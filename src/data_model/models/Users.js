"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/postgres.init");

class Users extends Model {
  // static associate(models) {
  //   this.belongsTo(models.Class);
  // }
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["student", "teacher", "admin", "super-admin"],
      allowNull: false,
    },
    mobileStatus: {
      type: DataTypes.ENUM,
      values: ["verified", "pending"],
      allowNull: false,
      defaultValue: "pending",
    },
    emailStatus: {
      type: DataTypes.ENUM,
      values: ["verified", "pending"],
      allowNull: false,
      defaultValue: "pending",
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    motherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accessLevel: {
      type: DataTypes.ENUM,
      values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      allowNull: true,
      defaultValue: "1",
    },
    school_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updated_on: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: "updated_on",
    sequelize,
    modelName: "users",
    tableName: "users",
  }
);

module.exports = Users;
