const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "postcute",
    host: "localhost",
    port: "5432",
    database: "yelp"
});

module.exports = pool;