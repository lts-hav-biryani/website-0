const express = require("express");
const { verifyToken } = require("../Utils/jwt");
const { userInfo } = require("../Models/user");


async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    try {
        if (!token) {
            throw error;
            return res.status(403).json({
                message: "Invalid token or expired token",
                status: false
            });
        }
        const decoded = await verifyToken(token);
        const email = decoded.email;
        const user = await userInfo.findOne({ email: email });
        const userId = user._id;
        req.user = userId;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Invalid token or expired token",
            status: false
        });
    }
}
module.exports = authMiddleware;