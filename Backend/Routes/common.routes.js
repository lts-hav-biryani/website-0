const express = require("express");
const routes = express.Router();
routes.post("/logout", logoutController);
routes.post("/changePassword", changePasswordController);
routes.post("/forgotPassword", forgotPasswordController);
routes.post("/login", loginController);
routes.post("/register", registerController);
module.exports = routes;