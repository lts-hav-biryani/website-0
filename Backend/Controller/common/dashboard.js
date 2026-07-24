const { userInfo } = require("../../Models/user");
const asyncHandler = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AsyncHanlder");




const dashboardController = asyncHandler(async (req, res) => {
    const decoded = req.userProfile;
    return res.status(200).json({
        userDetails: { name: decoded.name, email: decoded.email }
    });
});
module.exports = { dashboardController }