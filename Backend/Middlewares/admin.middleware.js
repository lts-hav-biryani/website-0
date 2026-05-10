const asyncHandler = require("../Utils/AsyncHanlder");
const AppError = require("../Utils/AppError");
const adminMiddleware = asyncHandler(async (req, res,next) => {
    const user = req.userProfile;
    if (!user.admin) {
        throw new AppError(403, "You are not allowed to view this page")
    }
    next();
});
module.exports = adminMiddleware;