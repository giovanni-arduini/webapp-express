const connection = require("../data/db");

function index(req, res) {
  const sql = `SELECT * FROM movies`;

  connection.query(sql, (err, movies) => {
    console.log(err);
    console.log(movies);

    res.json({ movies });
  });
}

function show(req, res) {}

module.exports = { index, show };
