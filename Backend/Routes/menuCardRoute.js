const express = require("express");
const { getMenuController } = require("../Controller/user/menu.controller");
const routes = express.Router();
routes.post("/getMenu", getMenuController);
module.exports = routes;