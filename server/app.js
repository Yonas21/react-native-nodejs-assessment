const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const bookRouter = require("./routes/book");
const db = require("./config/db"); //connects to Db

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// import the router in which the the request directed into
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/books", bookRouter);

module.exports = app;
