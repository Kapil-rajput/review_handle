const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController')
const { initializingPassport, isAuthenticated } = require("../config/passport");



router.get("/", (req, res) => res.render("home"));
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));
router.get("/adminDashboard", isAuthenticated, dashboardController.adminDashboard);
router.get("/employeeDashboard", isAuthenticated, dashboardController.employeeDashboard);



router.get("/logout", userController.logout);
router.post("/register", userController.register);
router.post("/login", userController.login);


module.exports = router;