const mongoose = require("mongoose");

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  },
};
