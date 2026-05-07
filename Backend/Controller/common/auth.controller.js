const bcrypt = require("bcrypt");
const { userInfo } = require("/Projects/LetsHavBiriyani-website/Backend/Models/user");
const { loginService } = require("../../Services/Common/auth.services");
const asyncHandler = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AsyncHanlder")
const AppError = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AppError");
const { assignToken } = require("../../Utils/jwt");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (typeof email !== "string") { throw new Error("Invalid Datatype") }
        if (typeof password !== "string") { throw new Error("Invalid Datatype") }
        const myObj = {};
        myObj.email = email;
        myObj.password = password;
        const response = await loginService(myObj);
        if (!response.status) {
            return res.status(401).json(
                response
            )
        }
        const token = await assignToken({ email: email });
        return res.status(200).cookie("token", token).json(
            response
        )
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            status: false
        })
    }
};
const registerController = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string" || typeof phoneNumber !== "string" || phoneNumber == undefined || email == undefined || name == undefined || password == undefined) {
        throw new AppError(400, "Invalid Entry");
    };
    const isUser = await userInfo.findOne({ email: email });
    if (isUser) {
        throw new AppError(400, "User already exists!")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userInfo.create({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword
    });
    return res.status(201).json({
        message: "User registered successfully!",
        status: true
    })
});
module.exports = { loginController, registerController }