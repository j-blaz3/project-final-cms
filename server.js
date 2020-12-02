const express = require("express");
require("dotenv").config(); // for loading environment variables
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const users = require("./routes/api/users");

const app = express();

// -------------------------- MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use("/api/users", users);
app.use("/api/posts/", require("./routes/api/posts"));

// -------------------------- DB CONFIG
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.log("err"));

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// -------------------------- ROUTES
app.use("/api/users/", require("./routes/api/users"));

// -------------------------- CONNECTION
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
