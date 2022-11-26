"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/postgres.init");

class Library extends Model {
  //   static associate(models) {
  //     this.belongsTo(models.users);
  //   }
}

Library.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    bookNames: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: null,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    issueDate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    returnDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fine: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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
    modelName: "library",
    tableName: "library",
  }
);

module.exports = Library;
