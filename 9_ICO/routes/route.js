const control = require("../controllers/control");
const express = require("express");
const route = express.Router();
route.post('/main', control.main);
route.post('/getBalance', control.getBalance);
module.exports = {route};