/**
 * This file holds the configurations for our database.
 */
require("dotenv").config();
const post = require("postgres");
// import postgres from 'postgres';


const sql = post('postgres://meal_planner_db_user:95Ac2216nUwJLcuqWO5wsI14JRQeIAWs@dpg-ch05ruseoogs2daj4sfg-a.oregon-postgres.render.com/meal_planner_db', {

})

// const sql = {
//   db: {
//     host: process.env.HOST,
//     user: process.env.USERDB,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//   },
// };
module.exports = sql;