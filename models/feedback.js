const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackchema = new Schema({
 
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
