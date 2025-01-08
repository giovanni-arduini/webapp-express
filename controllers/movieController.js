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

function show(req, res) {
  const id = parseInt(req.params.id);
  const sql = `SELECT * FROM movies WHERE id = ${id}`;

  connection.query(sql, (err, results) => {
    const movie = results[0];

    res.json({ movie });
  });
}

module.exports = { index, show };
