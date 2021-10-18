// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "bhuvanasridhara",
//   password: "password",
//   host: "localhost",
//   port: 5432,
//   database: "todolist"
// });


// pool.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

// module.exports = pool;


// Set up postgre connection to aws.
const { Client } = require("pg");

const client = new Client({
    user: 'postgres',
    host: 'bhuvana-mei-3tier.ch1ywcw8giyd.us-east-1.rds.amazonaws.com',
    database: 'ToDoList',
    password: '3tierbhuvanamei',
    port: 5432,
  })

  console.log("DB connection");
  client.connect(function(err) {
    console.log("Trying to connect!");
    if (err) {
      console.log("Unable to connect!");
      throw err;
    }
    console.log("Connected!");
  });

// Export connection for our ORM to use.
module.exports = client;
