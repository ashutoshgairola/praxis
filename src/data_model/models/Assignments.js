"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/postgres.init");

class Assignment extends Model {
//   static associate(models) {
//     this.belongsTo(models.users);
//   }
}

Assignment.init(
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
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
    modelName: "assignment",
    tableName: "assignment",
  }
);

module.exports = Assignment;
