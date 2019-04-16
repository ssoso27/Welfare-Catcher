const mysql = require('mysql')
const config = require('config')

const connection = mysql.createConnection({
    host : config.get('database.host'),
    port : config.get('database.port'),
    user : config.get('database.user'),
    password : config.get('database.password'),
    database : config.get('database.database')
});

class MyDatabase {
    constructor(connection) {
        this.connection = connection;
    }

    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (error, results, fields) => {
                if (error) {
                    reject(errer);
                } else {
                    resolve(results, fields);
                }
            });
        });
    }
}

module.exports = new MyDatabase(connection);
