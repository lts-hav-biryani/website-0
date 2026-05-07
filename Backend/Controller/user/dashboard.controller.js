const { addressService, ordersService, issuesService, reviewService } = require("../../Services/User/dashboardFeatures");
const { userInfo, userAddresses } = require("/Projects/LetsHavBiriyani-website/Backend/Models/user");
const AppError = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AppError");
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
module.exports = { addressController, orderController, reviewsController, issuesController }