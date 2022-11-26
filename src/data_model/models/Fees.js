"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/postgres.init");

class Fees extends Model {
  //   static associate(models) {
  //     this.belongsTo(models.users);
  //   }
}

Fees.init(
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
    classId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    baseFee: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    extraFee: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    examFee: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paymentMode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paymentDate: {
      type: DataTypes.INTEGER,
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
    modelName: "fees",
    tableName: "fees",
  }
);

module.exports = Fees;
