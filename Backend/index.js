const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./Config/db");
const cookieParser = require("cookie-parser");
const paymentRoutes = require("./Routes/paymentRoutes");
const authRoutes = require("./Routes/authRoutes");
const { authMiddleware } = require("./Middlewares/auth.middleware");
const AppError = require("./Utils/AppError");
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST"]
}));
app.use(cookieParser())
dbConnection();
app.use("/api/pay", authMiddleware, paymentRoutes);
app.use("/api", authRoutes);
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