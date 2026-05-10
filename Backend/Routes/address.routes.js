const express = require("express");
const routes = express.Router();
const { getSavedAddressController, saveAddress, deleteAddress } = require("../Controller/user/address.controller");
routes.post("/getSavedAddress", getSavedAddressController);
routes.post("/saveAddress", saveAddress);
routes.post("/deleteAddress", deleteAddress);
module.exports = routes;