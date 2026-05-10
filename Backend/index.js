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
const { authMiddleware } = require("./Middlewares/auth.middleware");
const adminMiddleware = require("./Middlewares/admin.middleware");
app.use(express.json())
dotenv.config();
app.use(cors({
    origin: [process.env.FRONTEND],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST"]
}));
dbConnection();
app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/user/myOrders", authMiddleware, userOrdersRoute);
app.use("/api/user/address", authMiddleware, addressRoute);
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
})