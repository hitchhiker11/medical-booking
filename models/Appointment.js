const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  doctor_id: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  // ...anything
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
