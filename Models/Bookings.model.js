const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  customerName: { type: String, require: true },
  bookingDate: { type: Date, require: true },
  startTime: { type: Date, require: true },
  endTime: { type: Date, require: true },
  roomId: mongoose.Schema.Types.ObjectId,
  
});

module.exports = mongoose.model("bookings", bookingSchema);
