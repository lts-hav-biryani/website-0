const jwt = require("jsonwebtoken");
async function verifyToken(token) {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw error;
    }
};
async function assignToken(myObj) {
    try {
        const token = await jwt.sign(myObj, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        return token;
    } catch (error) {
        throw error;
    }
};
module.exports = { assignToken, verifyToken };