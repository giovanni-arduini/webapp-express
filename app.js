const express = require("express");
const app = express();
const port = 3000;
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");
const movieRouter = require("./routers/movieRouter");
const cors = require("cors");

app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Ciao mamma!");
});

// console.log(process.env);
app.use("/api/movies", movieRouter);

app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`server is listenting on port ${port}`);
});
