const Users = require("../models/user");
const Assign = require("../models/assign");
const Feedback = require("../models/feedback");
module.exports.dashboard = async (req, res) => {
  const admins = await Users.find();
  const employee = await Users.find({isAdmin: false})
  const assigned = await Assign.find();
  res.render("dashboard", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
    Assigneds: assigned,
    Employees: employee
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

module.exports.assign = async (req, res) => {
  const admins = await Users.find();
  res.render("assign", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};

module.exports.reviews = async (req, res) => {
  const admins = await Users.find();
  const feedbacks = await Feedback.find();
  const employees = await Users.find({ isAdmin: false });
  const reviewsList = await Feedback.find()
    .populate("assignTo", "name username") // retrieve the name and username of the employee who received the feedback
    .populate("assignFor", "name username") // retrieve the name and username of the employee who the feedback is for
    .exec((err, feedbacks) => {
      if (err) {
        console.log(err);
      } else {
        res.render("reviews", { user:req.user, Feedbacks: feedbacks });
      }
    });
};
