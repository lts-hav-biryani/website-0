const express = require("express");
const routes = express.Router();
routes.post("/issues", adminIssuesController);
routes.post("/ordersAlert", adminOrderAlertController);
routes.post("/careers", adminCareerController);
routes.post("/menu", adminMenuController);
routes.post("/couponCodes", adminCouponCodesController);
module.exports = routes;