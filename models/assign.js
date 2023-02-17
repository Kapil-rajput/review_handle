const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignSchema = new Schema({
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const Assign = mongoose.model("Assign", assignSchema);
module.exports = Assign;
