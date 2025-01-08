const connection = require("../data/db");

function index(req, res) {
  const sql = `SELECT * FROM movies`;

  connection.query(sql, (err, movies) => {
    console.log(err);
    console.log(movies);

    if (err) return res.status(500).json({ message: err.message });

    res.json({ movies });
  });
}

function show(req, res) {}

module.exports = { index, show };
