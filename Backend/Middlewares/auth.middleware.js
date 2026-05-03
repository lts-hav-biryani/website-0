const express = require("express");
const { verifyToken } = require("../Utils/jwt");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({
            message: "Invalid token or expired token",
            status: false
        });
    }
    try {
        const decoded = await verifyToken(token);
        next();
    } catch (error) {
        console.log();
    }
};