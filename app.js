const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//
const helmet = require("helmet");
const cors = require("cors");

// laod api
const apiRoutes = require("./routes/api");

// express app ui
const app = express();

// log all --oneline
app.use(logger("combined"));
//
// setup security headers
// enable cors
app.use(helmet());
app.use(cors());
//
// parse json messages
app.use(express.json());
//
// parse complex data using `qs`
app.use(express.urlencoded({ extended: true }));
//
// load cookies
app.use(cookieParser());

//
// mount api
app.use("/api", apiRoutes);

// export
module.exports = app;
