const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.addone = async (req, res) => {
  const { name, username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.redirect("/add");
  }
  // Validate the password length
  if (password.length < 6) {
    return res.redirect("/add");
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user
  const user = new User({
    name,
    username,
    password: hashedPassword,
    isAdmin: false,
  });
  try {
    const savedUser = await user.save();
    res.redirect("dashboard");
  } catch (err) {
    console.error(err);
  }
};


////to edit one employeee
module.exports.editone = async (req, res) => {
    
}