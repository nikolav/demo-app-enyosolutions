const mysql = require("mysql2");
const client = mysql.createConnection({
  host: "70.34.223.252",
  port: 3306,
  database: "app",
  user: "app",
  password: "app122333",
});

//
client.connect((error) => {
  if (error) throw error;
});

module.exports = {
  client,
};
