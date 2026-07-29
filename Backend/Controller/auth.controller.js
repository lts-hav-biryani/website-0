const bcrypt = require("bcrypt");
const { userInfo } = require("../Models/user");
const { loginService } = require("../Services/auth.services");
const asyncHandler = require("../Utils/AsyncHanlder")
const AppError = require("../Utils/AppError");
const { assignToken } = require("../Utils/jwt");
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        // if (typeof email !== "string") { throw new Error("Invalid Datatype") }
        // if (typeof password !== "string") { throw new Error("Invalid Datatype") }
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
        throw new AppError(401, error.message)
        // return res.status(401).json({
        //     message: error.message,
        //     status: false
        // })
    }
};
const registerController = asyncHandler(async (req, res) => {
    console.log("Control reached to register controller ");
    const { fullName, email, password, phoneNumber } = req.body;
    let phone = Number(phoneNumber);
    let name = String(fullName);
    let emailId = String(email);
    let rawPassword = String(password)
    // if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string" || typeof phone !== "string" || phone == undefined || email == undefined || name == undefined || password == undefined) {
    //     throw new AppError(400, "Invalid Entry");
    // };
    const isUser = await userInfo.findOne({ email: email });
    if (isUser) {
        throw new AppError(400, "User already exists!")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userInfo.create({
        name: name,
        email: emailId,
        password: hashedPassword,
        phoneNumber: phone
    });
    return res.status(201).json({
        message: "User registered successfully!",
        status: true
    })
});
const loggedInController = async (req, res) => {
    return res.status(200).json({
        message: "User is Logged In!",
        success: true
    })
}
const changePasswordController = asyncHandler(async (req, res) => {
    const user = req.userProfile;
    const { oldPassword, newPassword } = req.body;
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
        throw new AppError(400, "Old Password didn't match with records!");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userInfo.updateOne({ _id: user._id }, { password: hashedPassword })
    return res.status(200).json({
        message: "Password changed successfully !",
        status: true
    })
});
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const logoutController = async (req, res) => {
    res.status(200).clearCookie(token, { sameSite: true, httpOnly: true, secure: true }).json({
        message: "Logout successful!",
        status: true
    });
}
module.exports = { logoutController, loggedInController, loginController, changePasswordController, registerController }