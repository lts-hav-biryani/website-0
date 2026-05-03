const express = require("express");
const routes = express.Router();
routes.post("/savedAddress", addressController);
module.exports = routes;