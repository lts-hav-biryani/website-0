const express = require("express");
const { verifyToken } = require("../Utils/jwt");
const { userInfo } = require("../Models/user");
const bcrypt = require("bcrypt");
const asyncHandler = require("../Utils/AsyncHanlder");
const AppError = require("../Utils/AppError");
const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    console.log("Control reached middleware");
    try {
        if (!token) {
            console.log(req.cookies);
            console.log(req.cookies.token);
            throw new AppError(400, "Invalid token or expired token");
        }
        const decoded = await verifyToken(token);
        if (!decoded) {
            throw new AppError(403, "Invalid Token or expired token!")
        }
        const email = decoded.email;
        const user = await userInfo.findOne({ email: email });
        req.userProfile = user;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Invalid token or expired token, Please Login again!",
            status: false
        });
    }
});
module.exports = { authMiddleware };  