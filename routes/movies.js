const express = require("express");
const {
  addMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getRandomMovie,
  getAllMovies,
  updateAll,
} = require("../controllers/movies");
const router = express.Router();

router.post("/", addMovie);
router.route("/:id").put(updateMovie).delete(deleteMovie);
router.get("/find/:id", getMovie);
router.get("/random", getRandomMovie);
router.get("/", getAllMovies);

module.exports = router;
