const express = require("express");
require("dotenv").config(); // for loading environment variables
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Body Parser - puts request data on req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;

// -------------------------- MIDDLEWARE
const passport = require("passport");

app.use(passport.initialize());
require("./middleware/passport")(passport);

// -------------------------- DB CONFIG
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongo Connection successful"))
  .catch((err) => console.log("err"));

mongoose.Promise = global.Promise;

// -------------------------- ROUTES
app.use("/api/users/", require("./routes/api/users"));

// -------------------------- CONNECTION
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
