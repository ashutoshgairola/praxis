"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/postgres.init");

class Result extends Model {
  //   static associate(models) {
  //     this.belongsTo(models.users);
  //   }
}

Result.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: "result",
    tableName: "result",
  }
);

module.exports = Result;
