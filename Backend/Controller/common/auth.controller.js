const bcrypt = require("bcrypt");
const { userInfo } = require("/Projects/LetsHavBiriyani-website/Backend/Models/user");
const { loginService } = require("../../Services/Common/auth.services");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const Email = String(email);
    const Password = String(password);
    const myObj = {};
    myObj.email = Email;
    myObj.password = Password;
    try {
        const response = await loginService(myObj);
        if (!response.status) {
            return res.status(401).json({
                response
            })
        }
        return res.status(200).json({
            response
        })
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            status: false
        })
    }
};
const registerController = async (req, res) => {
    const obj = req.body;
    const myObj = {};
    myObj.email = Email;
    myObj.password = Password;
    try {
        const response = await loginService(myObj);
        if (!response.status) {
            return res.status(401).json({
                response
            })
        }
        return res.status(200).json({
            response
        })
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            status: false
        })
    }
};
module.exports = { loginController }