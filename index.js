const express = require("express");
const app = express();
const connect = require("./db");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");
const listsRouter = require("./routes/lists");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authentication");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
require("dotenv").config();
require("express-async-errors");
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", authMiddleware, usersRouter);
app.use("/api/movies", authMiddleware, moviesRouter);
app.use("/api/lists", authMiddleware, listsRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;
const start = () => {
  try {
    connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Backend server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();
