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

function storeReview(req, res) {
  const id = req.params.id;
  const { text, vote, name } = req.body;

  console.log(text, vote, name, id);

  // res.json({ message: "chiamata effetuata!" });

  // validazione
  if (
    !name ||
    !vote ||
    isNaN(vote) ||
    parseInt(vote) < 1 ||
    parseInt(vote) > 5 ||
    name?.length > 255 ||
    typeof name !== "string"
  ) {
    return res.status(400).json({ message: "The data is not valid" });
  }

  const sql = `INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [text, name, vote, id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query failed" });
    console.log(results);
    res.status(201).json({ message: `Review added`, id: results.insertId });
  });
}

module.exports = { index, show, storeReview };
