const express = require("express");
const mongoose = require("mongoose");
const db = require("./services/db");

const User = require("./models/User");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

const app = express();

app.use(express.json());

db.connect();

app.post("/api/appointments", async (req, res) => {
  try {
    const { user_id, doctor_id, slot } = req.body;

    // Проверяем существование пользователя и доктора
    const user = await User.findById(user_id);
    const doctor = await Doctor.findById(doctor_id);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (!doctor) {
      return res.status(400).json({ msg: "Doctor not found" });
    }

    // Проверяем доступность слота
    if (!doctor.slots.includes(slot)) {
      return res.status(400).json({ msg: "Slot not available" });
    }

    // Создаем запись на прием
    const newAppointment = new Appointment({ user_id, doctor_id, slot });

    // Сохраняем запись
    await newAppointment.save();

    res.json(newAppointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
