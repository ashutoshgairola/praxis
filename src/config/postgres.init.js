'use strict';

const conf = require('../config/index');
const { Sequelize } = require('sequelize');
var postgres
console.log("Postgres Config: ", conf.postgres)
postgres = new Sequelize(conf.postgres)
postgres.sync()

function disconnectPostgres() {
    return Promise.all([
        postgres.close()
    ]);
}

function getConnection(name) {
    return postgres
}

async function getTransaction() {
    return await postgres.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ });
}


const sequelize = postgres;

module.exports = {
    disconnectPostgres,
    getConnection,
    sequelize,
    getTransaction
};