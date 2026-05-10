const bcrypt = require("bcrypt");
const { userInfo } = require("/Projects/LetsHavBiriyani-website/Backend/Models/user");
const { loginService } = require("../../Services/Common/auth.services");
const asyncHandler = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AsyncHanlder")
const AppError = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AppError");
const nodemailer = require("nodemailer");
const transporter = require("/Projects/LetsHavBiriyani-website/Backend/Utils/otp")
const { assignToken } = require("../../Utils/jwt");
const { otp } = require("../../Models/user");

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
const sendOtpController = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(generatedOtp, 10);
    const otpTrans = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Otp from LtsHavBiryani for Password Reset",
        text: `Your otp is ${generatedOtp}`
    });
    const user = await otp.create({ email: email, otp: hashedOtp, expiresAt: Date.now() + 10 * 60 * 1000 });
    return res.status(200).json({
        message: `Otp valid for 10mins has been sent to : ${email}`,
        status: true
    });
});
const forgotPasswordController = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const email = req.userEmail;
    const otpExist = await otp.findOne({ email: email });
    if (!otpExist.verified) {
        throw new AppError(403, "Please verify your otp!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userProfile = await userInfo.findOneAndUpdate({ email: email }, { password: hashedPassword }, { runValidators: true });
    return res.status(200).json({
        message: "Password reset successful!",
        status: true
    });
});
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
    res.status(400).clearCookie(token, { sameSite: true, httpOnly: true, secure: true }).json({
        message: "Logout successful!",
        status: true
    });
}
module.exports = { logoutController, loginController, sendOtpController, forgotPasswordController, changePasswordController, registerController }