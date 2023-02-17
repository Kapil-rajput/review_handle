

module.exports.dashboard = (req, res) => {
  res.render("dashboard", {
    user: req.user // Pass the user object to the view
  });
};
