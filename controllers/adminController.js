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

////to delete one employeee
module.exports.deleteone = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      name: req.body.name,
      username: req.body.username,
    });
    if (user) {
      res.redirect("/dashboard");
    } else {
      res.redirect("/delete");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/delete");
  }
};


////to edit one employee
module.exports.editone = async (req, res) => {
   try {
     const filter = { username: req.body.oldusername };
     const update = {
       username: req.body.username,
       name: req.body.name,
     };
     const options = { new: true };
     const user = await User.findOneAndUpdate(filter, update, options);
     res.redirect("/dashboard");
   } catch (error) {
     console.error(error);
     res.redirect('/dashboard')
   }
}



//.............................assign employee for feedback

module.exports.assign = (req, res) => {
  
}
