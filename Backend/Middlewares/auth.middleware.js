const express = require("express");
const { verifyToken } = require("../Utils/jwt");
const { userInfo, otp } = require("../Models/user");
const bcrypt = require("bcrypt");
const asyncHandler = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AsyncHanlder");
const AppError = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AppError");
const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) {
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
            message: "Invalid token or expired token",
            status: false
        });
    }
});
const forgotPasswordMiddleware = asyncHandler(async (req, res, next) => {
    const { email, userOtp } = req.body;
    if (!email || !userOtp) {
        throw new AppError(400, "Email and Otp are required!")
    }
    const user = await userInfo.findOne({ email: email });
    if (!user) {
        throw new AppError(400, "User not found!")
    }              
    const originalOtp = await otp.findOne({ email: email });
    if (!originalOtp) {
        throw new AppError(400, "Invalid Otp/Resend Otp");
    }
    const isOtpMatch = await bcrypt.compare(userOtp, originalOtp.otp);
    if (!isOtpMatch) {
        throw new AppError(403, "Invalid Otp/Resend Otp");
    }
    originalOtp.verified = true;
    req.userEmail = email;
    next();
})
module.exports = { authMiddleware, forgotPasswordMiddleware };  