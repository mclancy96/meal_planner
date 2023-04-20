/**
 * This file holds the configurations for our database.
 */
require("dotenv").config();

const sql = {
    db: {
        host: process.env.HOST,
        user: process.env.USERDB,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    },
};
module.exports = sql;