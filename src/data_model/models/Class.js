"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/postgres.init");

class Class extends Model {
//   static associate(models) {
//     this.hasMany(models.Users);
//   }
}

Class.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    classTeacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentList: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: null,
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
    modelName: "class",
    tableName: "class",
  }
);

module.exports = Class;
