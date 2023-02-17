const Users = require("../models/user");
module.exports.dashboard = async (req, res) => {
  const admins = await Users.find();
  res.render("dashboard", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};

module.exports.addEmployee = async (req, res) => {
  const admins = await Users.find();
  res.render("addEmployee", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};
module.exports.add = async (req, res) => {
  const admins = await Users.find();
  res.render("addEmp", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};
module.exports.edit = async (req, res) => {
  const admins = await Users.find();
  res.render("editEmp", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};
module.exports.delete = async (req, res) => {
  const admins = await Users.find();
  res.render("deleteEmp", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};
