'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  console.log(modelName)
  if (db[modelName].associate) {
    console.log("%$#%$#%$#%$", db[modelName])
    db[modelName].associate(db);
    const model = db[modelName]
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
