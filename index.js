'use strict';

// require('./init');
require('./src/data_model/models')

require('./src/data_model/models/Users')
const config = require('./src/config/index');

(async function () {
    let handler = null;

    process.on('SIGTERM', function () {
        if (!handler) {
            process.exit(0);
        }

        handler.shutdown(function () {
            process.exit(0);
        });

    });

    console.log("MODE : " + config.mode)

    if (config.mode === 'server') {
        handler = require('./src/server');
        handler.listen(config.port, config.server_type);
    } else {
        console.log("Unknown app mode");
        process.exit(1);
    }
})();








