const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  function displayResults(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
  }

  function searchByFirstOrLastName(callback) {
  let firstOrLastName = process.argv.slice(2);
  client.query(`SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text` , [`${firstOrLastName}`], callback)
  }

  searchByFirstOrLastName(displayResults)
});

