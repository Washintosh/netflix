const Movie = require("../models/Movie");
const { StatusCodes } = require("http-status-codes");
const { ForbiddenError, NotFoundError } = require("../errors");
require("express-async-errors");

const addMovie = async (req, res) => {
  if (!req.user.isAdmin)
    throw new ForbiddenError("You are not allowed to add a movie");

  const addedMovie = await Movie.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Successfully added", movie: addedMovie });
};

const updateMovie = async (req, res) => {
  if (!req.user.isAdmin)
    throw new ForbiddenError("You are not allowed to update a movie");

  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedMovie) throw new NotFoundError("Movie was not found");
  res
    .status(StatusCodes.OK)
    .json({ message: "Successfully updated", movie: updatedMovie });
};

const deleteMovie = async (req, res) => {
  if (!req.user.isAdmin)
    throw new ForbiddenError("You are not allowed to delete a movie");
  const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
  if (!deletedMovie) throw new NotFoundError("Movie was not found");

  res
    .status(StatusCodes.OK)
    .json({ message: "Successfully deleted", movie: deletedMovie });
};

const getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) throw new NotFoundError("Movie was not found");
  res.status(StatusCodes.OK).json({ message: "Successfully requested", movie });
};

const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movie;
  if (type === "series") {
    movie = await Movie.aggregate([
      { $match: { isSeries: true } },
      { $sample: { size: 1 } },
    ]);
  } else {
    movie = await Movie.aggregate([
      { $match: { isSeries: false } },
      { $sample: { size: 1 } },
    ]);
  }
  res.status(StatusCodes.OK).json({ message: "Successfully requested", movie });
};

const getAllMovies = async (req, res) => {
  if (!req.user.isAdmin)
    throw new ForbiddenError("Permission denied. You are not an admin");
  const movies = await Movie.find().sort({ createdAt: -1 });
  res
    .status(StatusCodes.OK)
    .json({ message: "Succesfully requested", nMovies: movies.length, movies });
};

module.exports = {
  addMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getRandomMovie,
  getAllMovies,
};
