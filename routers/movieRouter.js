const express = require("express");
const router = express.Router();
const { index, show, storeReview } = require("../controllers/movieController");

router.get("/", index);

router.get("/:id", show);

router.post("/:id/reviews", storeReview);

module.exports = router;
