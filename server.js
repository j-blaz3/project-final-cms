const express = require("express");
require("dotenv").config(); // for loading environment variables
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;

// Body Parser - puts request data on req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Mongo Connection successful"))
  .catch((err) => console.log("err"));

// // -------------------------- CONNECTION
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
