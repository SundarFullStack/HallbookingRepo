const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  roomName: { type: String, require: true },
  bookedStatus: { type: Boolean, require: true },
  seatsCount: { type: Number, requied: true },
  Amenties: { type: Array, require: true },
  priceForhour: { type: Number, required: true },
  createdDate: { type: Date, default: new Date("4/10/2021") },
  createdBy: { type: String, default: "Sundar" },
  updatedDate: { type: Date, default: new Date("4/10/2021") },
  updatedBy: { type: String, default: "Sundar" },
});

module.exports = mongoose.model("rooms", roomSchema);
