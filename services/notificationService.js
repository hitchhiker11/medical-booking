const fs = require("fs");
const moment = require("moment");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Doctor = require("../models/Doctor");

async function checkAndSendNotifications() {
  const currentTime = moment();

  const upcomingAppointments = await Appointment.find();

  for (let appointment of upcomingAppointments) {
    const user = await User.findById(appointment.user_id);
    const doctor = await Doctor.findById(appointment.doctor_id);
    const appointmentTime = moment(appointment.slot);

    if (!user || !doctor) continue;

    let message = null;

    if (currentTime.isSame(appointmentTime.clone().subtract(1, "day"), "day")) {
      message = `Привет ${user.name}! Напоминаем, что вы записаны к ${
        doctor.spec
      } завтра в ${appointmentTime.format("HH:mm")}!`;
    } else if (
      currentTime.isSame(appointmentTime.clone().subtract(2, "hours"), "hour")
    ) {
      message = `Привет ${user.name}! Вам через 2 часа к ${
        doctor.spec
      } в ${appointmentTime.format("HH:mm")}!`;
    }

    if (message) {
      console.log(message);
      fs.appendFileSync(
        "notifications.log",
        `${currentTime.format()} | ${message}\n`
      );
    }
  }
}

setInterval(checkAndSendNotifications, 60000);
