// importing pssport local for local strategy
const LocalStrategy = require("passport-local").Strategy;
// requiring bcrypt for hashing password
const bcrypt = require("bcrypt");
// importing users
const User = require("../models/user");
// exporting initiaslizing passport function
exports.initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid username or password" });
        }
      } catch (err) {
        return done(err);
      }
    })
  );
  //serializing user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  //deserializing user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};

// authenticated function to check whether the user is login or not
exports.isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  res.redirect("/login");
};
//authenticateed fucntion to check login user is admin or not
exports.isAuthenticatedAdmin = (req, res, next) => {
  if (req.user.isAdmin == true) return next();
  res.redirect("/login");
};
