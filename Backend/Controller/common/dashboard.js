const { userInfo } = require("../../Models/user");
const asyncHandler = require("/Projects/LetsHavBiriyani-website/Backend/Utils/AsyncHanlder");

const dashboardController = asyncHandler(async (req, res) => {
    const decoded = req.user;
    const userEmail = decoded.email;
    const user = await userInfo.findOne({ email: userEmail });
    return res.status(200).json({
        userDetails: { name: user.name, email: user.email}
    });
})