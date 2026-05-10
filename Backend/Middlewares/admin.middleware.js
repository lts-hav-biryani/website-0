const asyncHandler = require("../Utils/AsyncHanlder");
const AppError = require("../Utils/AppError");
const { userInfo } = require("../Models/user");
const adminMiddleware = asyncHandler(async (req, res, next) => {
    const userDet = req.userProfile;
    const user = await userInfo.findOne({ _id: userDet._id });
    if (!user.admin) {
        throw new AppError(403, "You are not allowed to view this page")
    }
    next();
});
module.exports = adminMiddleware;