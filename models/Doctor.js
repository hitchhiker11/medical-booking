const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  spec: {
    type: String,
    required: true,
  },
  slots: [String],
  // ...anything
});

module.exports = mongoose.model("Doctor", DoctorSchema);
