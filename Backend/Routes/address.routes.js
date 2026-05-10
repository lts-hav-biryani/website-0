const express = require("express");
const routes = express.Router();
const {getSavedAddressController, saveAddress} = require("../Controller/user/address.controller");
routes.post("/getSavedAddress", getSavedAddressController);
routes.post("/saveAddress", saveAddress);
routes.post("/deleteAddress", deleteAddressController);
module.exports = routes;