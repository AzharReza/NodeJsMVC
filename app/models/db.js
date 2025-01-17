// const mysql = require("mysql");
const mysql = require('mysql2/promise');

var connection = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "node-js"
});

module.exports = connection;
