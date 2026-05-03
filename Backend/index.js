const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./Config/db");
const userRoutes = require("./Routes/user.routes");
const userOrdersRoute = require("./Routes/orders.routes");
const issuesRoute = require("./Routes/issues.routes");
const addressRoute = require("./Routes/address.routes");
const adminRoute = require("./Routes/admin.routes")
const commonRoutes = require("./Routes/common.routes");
app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST"]
}));
dotenv.config();
dbConnection();
app.post("/api/user", userRoutes);
app.post("/api/user/myOrders", userOrdersRoute);
app.post("/api/user/issues", issuesRoute);
app.post("/api/user/address", addressRoute);
app.post("/api/admin", adminRoute);
app.post("/api", commonRoutes);
app.get("/", (req, res) => {
    res.send(`<h2>Hello </h2>`);
})
app.listen(process.env.PRODPORT, () => {
    console.log(`The server is running on ${process.env.PRODPORT}`);
})