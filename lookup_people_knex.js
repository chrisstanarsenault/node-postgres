let settings = require("./settings");
let knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

let firstOrLastName = process.argv.slice(2);

knex.select().from('famous_people').where({
    "first_name": `${firstOrLastName}`
  }).orWhere({
    "last_name": `${firstOrLastName
  }`}).then(function (result) {
  console.log(result);
});


// knex.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }

//   function displayResults(err, result) {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(result.rows);
//   }

//   function searchByFirstOrLastName(callback) {

//     client.query(`SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text`, [`${firstOrLastName}`], callback)
//   }

//   searchByFirstOrLastName(displayResults)
// });