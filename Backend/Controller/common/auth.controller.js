const bcrypt = require("bcrypt");
const { userInfo } = require("/Projects/LetsHavBiriyani-website/Backend/Models/user");
const { loginService } = require("../../Services/Common/auth.services");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (typeof email !== String) { throw new Error("Invalid Datatype") }
        if (typeof password !== String) { throw new Error("Invalid Datatype") }
        const myObj = {};
        myObj.email = email;
        myObj.password = password;
        const response = await loginService(myObj);
        if (!response.status) {
            return res.status(401).json(
                response
            )
        }
        return res.status(200).json(
            response
        )
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            status: false
        })
    }
};
const registerController = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    const nameStr = String(name);
    const nameStr = String(name);
    const nameStr = String(name);
    const nameStr = String(name);
    try {

    } catch (error) {

    }
};
module.exports = { loginController, registerController }