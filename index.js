// requiring express
const express = require("express");
//requiring express-layouts
const expressLayouts = require("express-ejs-layouts");
//requiring mongoose
const mongoose = require("mongoose");
//requiring express session
const session = require("express-session");
//requiring passport
const passport = require("passport");
//importing function which created in passport.js
const { initializingPassport, isAuthenticated } = require("./config/passport");
const app = express();
const flash = require('express-flash');
const bcrypt = require("bcrypt");


// making app to use sessions
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
  })
);
// database connection
const db = require("./config/keys").MONGOURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

  //passport functions
initializingPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// making app to use express layouts, making app to use view engine as ejs
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(flash());
app.use(express.urlencoded({ extended: false }));
//making public folder as static
app.use(express.static("public"));

const port = 3000;
app.use("/", require("./routes/index"));

// making app to listen on port
app.listen(port, () => console.log(`App listening on port ${port}!`));
