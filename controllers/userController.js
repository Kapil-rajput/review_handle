const express = require("express");
const User = require('../models/user');
const passport = require('passport')

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


module.exports.login = passport.authenticate("local", {
    failureRedirect: "/register",
    successRedirect: "/dashboard",
})
  
module.exports.logout = async (req, res) => {
    req.logout(function (err) { if (err)  return next(err)});
    res.redirect("/login");
}