const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "admin",
    port: 5432,
    password: "1234",
    database: "postgres",
  },
});

module.exports = knex;
