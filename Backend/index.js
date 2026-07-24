const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./Config/db");
const menuCardRoute = require("./Routes/menuCardRoute");
const userOrdersRoute = require("./Routes/orders.routes");
const addressRoute = require("./Routes/address.routes");
const adminRoute = require("./Routes/admin.routes")
const commonRoutes = require("./Routes/common.routes");
const { authMiddleware } = require("./Middlewares/auth.middleware");
const adminMiddleware = require("./Middlewares/admin.middleware");
const { webhookController } = require("./Controller/admin/order.controller");
dotenv.config();
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST"]
}));
dbConnection();
app.use("/api/public", menuCardRoute);
app.use("/api", userOrdersRoute);
app.use("/api/user/myOrders", authMiddleware, userOrdersRoute);
app.use("/api/user/address", authMiddleware, addressRoute); //done
app.use("/api/admin", authMiddleware, adminMiddleware, adminRoute);
app.use("/api", commonRoutes);
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error!",
        success: false
    })
})
app.listen(process.env.PRODPORT, () => {
    console.log(`The server is running on ${process.env.PRODPORT}`);
});