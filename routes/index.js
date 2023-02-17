const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const dashboardController = require("../controllers/dashboardController");
const adminController = require("../controllers/adminController");
const { initializingPassport, isAuthenticated, isAuthenticatedAdmin } = require("../config/passport");

router.get("/", (req, res) => res.render("home"));
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));
router.get("/logout", userController.logout);
router.get("/dashboard", isAuthenticated, dashboardController.dashboard);
//this below one is only fro add update removve page not to add employee
router.get("/addemployee", isAuthenticatedAdmin, dashboardController.addEmployee);
router.get("/add", isAuthenticatedAdmin, dashboardController.add);
router.get("/delete", isAuthenticatedAdmin, dashboardController.delete);
router.get("/edit", isAuthenticatedAdmin, dashboardController.edit);
router.get("/assign", isAuthenticatedAdmin, dashboardController.assign);




router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/add", isAuthenticatedAdmin, adminController.addone);
router.post("/delete", isAuthenticatedAdmin, adminController.deleteone);
router.post("/edit", isAuthenticatedAdmin, adminController.editone);
router.post("/assign", isAuthenticatedAdmin, adminController.assign)

module.exports = router;
