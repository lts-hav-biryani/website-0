const { userReviews } = require("../../Models/user");
const { userInfo, userAddresses, userOrders, userOrders, userOrders, userIssues } = require("/Projects/LetsHavBiriyani-website/Backend/Models/user");
const AppError = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AppError");

const addressService = async (_id) => {
    const address = await userAddresses.findOne({ userId: _id });
    if (!address) {
        throw new AppError(400, "No saved address found!")
    }
    const addressArray = address.addresses;
    return addressArray;
};
const ordersService = async (_id) => {
    const orders = await userOrders.findOne({ userId: _id });
    if (!orders) {
        throw new AppError(400, "No orders yet!");
    }
    const orderObj = {
        completedOrders: orders.completedOrders,
        failedOrders: orders.failedOrders,
        pendingOrders: orders.pendingOrders
    };
    return orderObj;
};
const issuesService = async (_id) => {
    const issues = await userIssues.findOne({ userId: _id });
    if (!issues) {
        throw new AppError(400, "No issues!");
    }
    const issuesObj = {
        openIssues: issues.openIssues,
        closedIssues: issues.closedIssues,
        pendingIssues: issues.pendingIssues
    };
    return issuesObj;
};
const reviewService = async (_id) => {
    const reviewsUser = await userReviews.findOne({ userId: _id });
    if (!reviewsUser) {
        throw new AppError(400, "No reviews!");
    }
    return reviewsUser;
};


module.exports = { addressService, ordersService, issuesService, reviewService }