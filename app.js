const express = require("express");
const app_server = express();

//REGISTERING ALL CONTROLLERS IN APP SERVER

app_server.use("/rooms", require("./Controllers/Room.controller"));
app_server.use("/bookings", require("./Controllers/Bookings.controller"));
app_server.use("/customers", require("./Controllers/Customer.controller"));

module.exports = app_server;
