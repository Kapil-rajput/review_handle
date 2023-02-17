const Users = require("../models/user");
module.exports.dashboard = async (req, res) => {
  const admins = await Users.find();
  res.render("dashboard", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};
