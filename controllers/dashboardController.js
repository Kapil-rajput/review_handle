
// importing user, assign, feedback from databases
const Users = require("../models/user");
const Assign = require("../models/assign");
const Feedback = require("../models/feedback");

//function to render dashbaord
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

//function to render add edit delete page
module.exports.addEmployee = async (req, res) => {
  const admins = await Users.find();
  res.render("addEmployee", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};
//function to render add employee page
module.exports.add = async (req, res) => {
  const admins = await Users.find();
  res.render("addEmp", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};
// fucntion to render edit employee page
module.exports.edit = async (req, res) => {
  const admins = await Users.find();
  res.render("editEmp", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};
// function to render delete page
module.exports.delete = async (req, res) => {
  const admins = await Users.find();
  res.render("deleteEmp", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};

// fucntion to render assign page 
module.exports.assign = async (req, res) => {
  const admins = await Users.find();
  res.render("assign", {
    user: req.user, // Pass the user object to the view
    Admins: admins,
  });
};

// fucntion to render to makeadmin page
module.exports.makeAdmin = async (req, res) => {
  const employees = await Users.find({ isAdmin: false });
  res.render("makeAdmin", {
    user: req.user,
    Employees: employees
  });
};

// function to render review page
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
