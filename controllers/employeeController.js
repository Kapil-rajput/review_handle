const User = require("../models/user");
const Feedback = require("../models/feedback");
const Assign = require("../models/assign");



module.exports.feedback = async (req, res) => {
  const assignFor = req.params.assignFor;
  const assignTo = req.params.assignTo;
  const feedback = new Feedback({
    assignFor: assignFor,
    assignTo: assignTo,
    feedback: req.body.feedback
  });
  try {
    const saveFeedback = await feedback.save();
    const deleteAssign = await Assign.findOneAndDelete({ assignFor: assignFor, assignTo: assignTo, });
    res.redirect('back');
  } catch (error) {
    console.log(error)
  }
};


//.......................................


