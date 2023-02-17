const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const { initializingPassport, isAuthenticated } = require("./config/passport");
const app = express();
const flash = require('express-flash');
const bcrypt = require("bcrypt");


app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
  })
);
const db = require("./config/keys").MONGOURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

initializingPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(flash());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

const port = 3000;
app.use("/", require("./routes/index"));

app.listen(port, () => console.log(`App listening on port ${port}!`));
