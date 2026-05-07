const { addressService, ordersService, issuesService, reviewService } = require("../../Services/User/dashboardFeatures");
const { userInfo, userAddresses } = require("/Projects/LetsHavBiriyani-website/Backend/Models/user");
const AppError = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AppError");
const asyncHandler = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AsyncHanlder");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const addressController = asyncHandler(async (req, res) => {
    const decoded = req.user;
    const result = await addressService(decoded.email);
    return res.status(200).json({
        address: result,
        status: true
    })
});
const orderController = asyncHandler(async (req, res) => {
    const decoded = req.user;
    const result = await ordersService(decoded.email);
    return res.status(200).json({
        orders: result,
        status: true
    });
});
const issuesController = asyncHandler(async (req, res) => {
    const decoded = req.user;
    const result = await issuesService(decoded.email);
    return res.status(200).json({
        issues: result,
        status: true
    });
});
const reviewsController = asyncHandler(async (req, res) => {
    const decoded = req.user;
    const result = await reviewService(decoded.email);
    return res.status(200).json({
        reviews: result.review,
        status: true
    });
});
module.exports = { addressController, orderController, reviewsController, issuesController }