'use strict';

const CoreRoute = require('./v1.0/routes/core.routes');

module.exports = (app) => {
    app.use(CoreRoute)
}