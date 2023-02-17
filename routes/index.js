const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const dashboardController = require("../controllers/dashboardController");
const adminController = require("../controllers/adminController");
const { initializingPassport, isAuthenticated } = require("../config/passport");

router.get("/", (req, res) => res.render("home"));
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));
router.get("/dashboard", isAuthenticated, dashboardController.dashboard);
//this below one is only fro add update removve page not to add employee
router.get("/addemployee", isAuthenticated, dashboardController.addEmployee);
router.get("/add", isAuthenticated, dashboardController.add);
router.get("/delete", isAuthenticated, dashboardController.delete);
router.get("/edit", isAuthenticated, dashboardController.edit);


router.post("/add", isAuthenticated, adminController.addone);
router.post("/edit",isAuthenticated, adminController.editone)
router.get("/logout", userController.logout);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
