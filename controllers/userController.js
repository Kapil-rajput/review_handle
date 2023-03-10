//importing express, User,passport, bcrypt
const express = require("express");
const User = require('../models/user');
const passport = require('passport')
const bcrypt = require('bcrypt')


// function to register user and add to the database
module.exports.register = async (req, res) => {
  const { name, username, password, isAdmin } = req.body;

  // Check if the email is already registered
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    req.flash("errors", "That email is already registered.");
    req.flash("userInput", { name, username, password, isAdmin });
    return res.redirect("/register");
  }

  // Validate the password length
  if (password.length < 6) {
    req.flash("errors", "Password must be at least 6 characters long.");
    req.flash("userInput", { name, username, password, isAdmin });
    return res.redirect("/register");
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({ name, username, password: hashedPassword, isAdmin });
  try {
    const savedUser = await user.save();
    req.flash("successMessage", "You are now registered and can log in.");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.flash(
      "errors",
      "An error occurred while registering. Please try again later."
    );
    req.flash("userInput", { name, username, password, isAdmin });
    res.redirect("/register");
  }
};


// function to login user if it is present in the database
module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      req.flash(
        "errors",
        "An error occurred while logging in. Please try again later."
      );
      return res.redirect("/login");
    }

    if (!user) {
      req.flash("errors", info.message);
      req.flash("userInput", { username: req.body.username });
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        req.flash(
          "errors",
          "An error occurred while logging in. Please try again later."
        );
        return next(err);
      }

      if (user) {
        res.locals.user = user;
        res.redirect("/dashboard");
      } else {
        res.redirect("/register");
      }
    });
  })(req, res, next);
};

// fucntion to logout the user
module.exports.logout = async (req, res) => {
    req.logout(function (err) { if (err)  return next(err)});
    res.redirect("/login");
}
