const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});


// pool.connect((error) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("MySql Connected...")
//     }
// })

module.exports = pool;