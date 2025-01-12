const connection = require("../data/db");

function index(req, res) {
  let sql = `SELECT movies.*, AVG(vote) AS avg_vote FROM movies JOIN reviews ON movies.id = reviews.movie_id`;

  console.log(req.query);

  if (req.query.title) {
    console.log(req.query.title);
    sql += ` WHERE title LIKE '%${req.query.title}%'`;
  }

  sql += ` GROUP BY movies.id`;

  connection.query(sql, (err, movies) => {
    console.log(err);
    console.log(movies);

    movies.forEach((movie) => {
      movie.image = `http://localhost:3000${movie.image}`;
    });

    if (err) return res.status(500).json({ message: err.message });

    res.json({ movies });
  });
}

// ------------------

function show(req, res) {
  const id = parseInt(req.params.id);
  let sql = `SELECT movies.*, AVG(vote) AS avg_vote
 FROM movies 
 JOIN reviews 
 ON movies.id = reviews.movie_id 
 WHERE movies.id=${id}
 GROUP BY movies.id`;

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404);

    const movie = results[0];

    console.log(results);

    sql = `SELECT * FROM reviews WHERE movie_id = ${id}`;
    connection.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      movie.reviews = results;
      res.json({ movie, success: true });
      console.log(movie);
    });
  });
}

module.exports = { index, show };
