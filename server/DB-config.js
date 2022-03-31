const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vacations_db",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to mySQL");
  }
});

const myQuery = (sqlCode) => {
  return new Promise((resolve, reject) => {
    connection.query(sqlCode, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { myQuery };
