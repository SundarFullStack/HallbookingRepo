//IMPORTING ALL NECESSARY INSTALLED PACKAGES TO CREATE NODE SERVER
const express = require("express");
const http_server = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//DOTENV FOR AUTO DB CONNECTION CONVERSION (DEV-PROD)

require("dotenv").config();

//CORS CONFIGURATION

http_server.use(cors());

// //BODY PARSE CONFIG

http_server.use(bodyParser.urlencoded({ extended: false }));

http_server.use(bodyParser.json());

//DATABASE CONNECTION CONFIGURATION

require("./Database/dbConfig");

//PORT

const port = 8000;

//CONFIGURING SERVER WITH PORT AND LOCALHOST

http_server.listen(port, "0.0.0.0", () => {
  console.log("SERVER STARTED IN THE PORT", port);
});

http_server.use("/", require("./app"));
