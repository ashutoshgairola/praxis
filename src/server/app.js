'use strict';

const http = require("http");
http.globalAgent.keepAlive = true;

var expressWinston = require('express-winston');
var winston = require('winston');
const express = require("express");
const bodyParser = require('body-parser');
const config = require('../config');
const path = require('path');
const CoreRoute = require("./routes/core/v1.0/routes/core.routes");

let apiRoutesDir = path.resolve('../../server/routes') + '/**/*.js';
function createApp(server_type) {
    const app = express();
    app.use(bodyParser.json({ limit: '2mb' }));
    app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));

    if (config.debug) {
        app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            )
        }));
    }
    if (config.node_env == "test") {
        app.use(CoreRoute)
    }
    else {
        if (server_type === "core") {
            require('./routes/core')(app);
            apiRoutesDir = path.resolve('./src/server/routes/core/v1.0/routes/*.js');
        } else {
            console.error("Invalid server type ", server_type);
            process.exit(1);
        }
    }

    if (config.debug) {
        app.use(expressWinston.errorLogger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            )
        }));
    }



    app.all('*', function (req, res) {
        res.status(404).json({
            "message": "not found"
        });
    });
    app.use(function onError(err, req, res, next) {
        err = err || {};

        let statusCode = 500;
        if (err.name === 'ResourceNotFoundError') {
            statusCode = 400;
        }
        if (err.name === 'CastError') {
            statusCode = 400;
        }
        if (err.statusCode) {
            statusCode = err.statusCode;
        }

        let resData = {
            message: err.errors || err.message || err,
            code: err.code
        };

        if (config.debug) {
            resData.stack = err.stack;
        }

        res.status(statusCode).json(resData);
    });
    return app;
}


module.exports = createApp;
