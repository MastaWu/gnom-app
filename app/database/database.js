'use strict';

module.exports = (function(){

    var mysql    = require('mysql');
    var databaseConfig = require('../../config/config');
    var database = {
        initDB : initDB,
        query : query,
        disconnect : disconnect
    };

    function initDB(databaseConfig) {
        console.log(databaseConfig.database.host);
        
        GLOBAL.pool = mysql.createPool({
            host: databaseConfig.database.host,
            port: databaseConfig.database.port,
            user: databaseConfig.database.user,
            password: databaseConfig.database.password
        })
    };

    function query(query, callback) {
        GLOBAL.pool.query(query, function(err, res) {
            if (err) {
                this.initDB();
                //you can call the query again here if you want
            } else {
                callback(res);
            }
        })
    };

    function disconnect() {
        if (GLOBAL.pool) {
            GLOBAL.pool.end();
        }
    }
    
    return database;
})();
