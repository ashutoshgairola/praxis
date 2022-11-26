'use strict';

const _ = require('lodash');
const convict = require('convict');
const dotenv = require('dotenv');
dotenv.config();
const conf = convict({
    env: {
        doc: 'env',
        format: String,
        default: 'default',
        env: 'ENV',
        arg: 'env'
    },
    node_env: {
        doc: 'node env',
        format: String,
        default: 'development',
        env: 'NODE_ENV',
        arg: 'node_env'
    },
    mode: {
        doc: 'app mode',
        format: String,
        default: 'server',
        env: 'MODE',
        arg: 'mode'
    },
    port: {
        doc: "The port to bind",
        format: "port",
        default: 7071,
        env: "PORT",
        arg: "port"
    },
    postgres: {
        doc: 'Postgres connection',
        format: String,
        default: 'sureshot.csoyrubrj51k.ap-northeast-1.rds.amazonaws.com',
        env: 'POSTGRES_READ_WRITE',
        arg: 'postgres',
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    log_level: {
        doc: 'log level',
        format: String,
        default: "info",
        env: 'LOG_LEVEL',
        arg: 'log_level'
    },
    debug: {
        doc: 'debug',
        format: Boolean,
        required: false,
        default: false,
        env: 'DEBUG',
        arg: 'debug'
    },
    server_type: {
        doc: "server type",
        format: String,
        default: 'core',
        env: "SERVER_TYPE",
        arg: "server_type"
    }
});

var env = conf.get('env');
try {
    conf.loadFile('./config/' + env + '.json');
} catch (err) {
    console.log(err)
}


conf.validate({ allowed: "strict" });

_.extend(conf, conf.get());

module.exports = conf;
