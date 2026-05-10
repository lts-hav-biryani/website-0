const express = require("express");
const { completedOrdersController, failedOrdersController, pendingOrdersController } = require("../Controller/user/orders.controller");
const routes = express.Router();
routes.post("/completedOrders", completedOrdersController);
routes.post("/failedOrders", failedOrdersController);
routes.post("/pendingOrders", pendingOrdersController);
module.exports = routes;