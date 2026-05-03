const express = require("express");
const routes = express.Router();
routes.post("/login", loginController);
routes.post("/register", registerController);
routes.post("/myOrders", ordersController);
module.exports = routes;