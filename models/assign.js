const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignSchema = new Schema({
    assignTO: {
      type: mongoose
  }
});

const Assign = mongoose.model("Assign", assignSchema);
module.exports = Assign;
