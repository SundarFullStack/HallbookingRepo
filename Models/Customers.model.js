const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: false },
  phoneNo: { type: String, required: false },
  bookedCount: { type: Number, required: true },
});

module.exports = mongoose.model("customers", customerSchema);
