function errorsHandler(err, req, res, _) {
  res.status(500).json({ error: err.message });
}

module.exports = errorsHandler;
