const express = require("express");
const routes = express.Router();


routes.post("/completedOrders", completedOrdersController);
routes.post("/failedOrders", failedOrdersController);
routes.post("/pendingOrders", pendingOrdersController);

module.exports = routes;