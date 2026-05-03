const express = require("express");
const routes = express.Router();
routes.post("/myOrders", ordersController);
module.exports = routes;