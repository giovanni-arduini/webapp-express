const express = require("express");
const app = express();
const port = 3000;

app.get("./", (req, res) => {
  res.send("Ciao mamma!");
});

app.listen(port, () => {
  console.log(`server is listenting on port ${port}`);
});
