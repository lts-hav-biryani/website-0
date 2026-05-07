const { addressService, ordersService, issuesService, reviewService } = require("../../Services/User/dashboardFeatures");
const { userInfo, userAddresses } = require("/Projects/LetsHavBiriyani-website/Backend/Models/user");
const AppError = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AppError");
const bcrypt = require("bcrypt");
const asyncHandler = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AsyncHanlder");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const addressController = asyncHandler(async (req, res) => {
    const _id = req.user;
    const result = await addressService(_id);
    return res.status(200).json({
        address: result,
        status: true
    })
});
const orderController = asyncHandler(async (req, res) => {
    const _id = req.user;
    const result = await ordersService(_id);
    return res.status(200).json({
        orders: result,
        status: true
    });
});
const issuesController = asyncHandler(async (req, res) => {
    const _id = req.user;
    const result = await issuesService(_id);
    return res.status(200).json({
        issues: result,
        status: true
    });
});
const reviewsController = asyncHandler(async (req, res) => {
    const _id = req.user;
    const result = await reviewService(_id);
    return res.status(200).json({
        reviews: result.review,
        status: true
    });
});
const passwordChangeController = asyncHandler(async (req, res) => {
    const userId = req.user;
    const { oldPassword, newPassword } = req.body;
    const user = await userInfo.findById(_id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new AppError(400, "Invalid Old Password");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updating = await user.updateOne({ _id: userId }, { password: hashedPassword });
    return res.status(200).json({
        message: "Password Changed successfully!",
        status: true
    })
})
module.exports = { addressController, orderController, reviewsController, issuesController }