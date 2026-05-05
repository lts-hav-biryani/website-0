const express = require("express");
const { verifyToken } = require("../Utils/jwt");



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
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Invalid token or expired token",
            status: false
        });
    }
}
module.exports = authMiddleware;