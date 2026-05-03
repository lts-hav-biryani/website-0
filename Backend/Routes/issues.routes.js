const express = require("express");
const routes = express.Router();
routes.post("/openIssues", openIssuesController);
routes.post("/pendingIssues", pendingIssuesController);
routes.post("/closedIssues", closedIssuesController);
module.exports = routes;